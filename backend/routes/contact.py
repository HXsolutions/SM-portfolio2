from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from ..models import ContactForm, ContactFormCreate, ContactResponse, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactFormCreate):
    """Submit contact form"""
    try:
        contact_dict = contact_data.dict()
        contact_obj = ContactForm(**contact_dict)
        
        # Insert into database
        result = await db.contacts.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return ContactResponse(
                message="Thank you for your message! I'll get back to you within 24 hours.",
                contact_id=contact_obj.id,
                success=True
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")

@router.get("/contact", response_model=List[ContactForm])
async def get_all_contacts():
    """Get all contact form submissions (Admin only)"""
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
        return [ContactForm(**contact) for contact in contacts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contacts: {str(e)}")

@router.get("/contact/{contact_id}", response_model=ContactForm)
async def get_contact(contact_id: str):
    """Get specific contact form submission"""
    try:
        contact = await db.contacts.find_one({"id": contact_id})
        if not contact:
            raise HTTPException(status_code=404, detail="Contact not found")
        return ContactForm(**contact)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact: {str(e)}")

@router.put("/contact/{contact_id}/status", response_model=MessageResponse)
async def update_contact_status(contact_id: str, status: str):
    """Update contact status"""
    try:
        valid_statuses = ["new", "read", "replied"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return MessageResponse(message=f"Contact status updated to {status}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating contact status: {str(e)}")

@router.delete("/contact/{contact_id}", response_model=MessageResponse)
async def delete_contact(contact_id: str):
    """Delete contact form submission"""
    try:
        result = await db.contacts.delete_one({"id": contact_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return MessageResponse(message="Contact deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting contact: {str(e)}")