from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from ..models import Testimonial, TestimonialCreate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(featured_only: bool = False):
    """Get testimonials with optional featured filter"""
    try:
        query = {}
        if featured_only:
            query["is_featured"] = True
        
        testimonials = await db.testimonials.find(query).sort("created_at", -1).to_list(100)
        return [Testimonial(**testimonial) for testimonial in testimonials]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching testimonials: {str(e)}")

@router.get("/testimonials/{testimonial_id}", response_model=Testimonial)
async def get_testimonial(testimonial_id: str):
    """Get specific testimonial"""
    try:
        testimonial = await db.testimonials.find_one({"id": testimonial_id})
        if not testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return Testimonial(**testimonial)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching testimonial: {str(e)}")

@router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Create new testimonial"""
    try:
        testimonial_dict = testimonial_data.dict()
        testimonial_obj = Testimonial(**testimonial_dict)
        
        result = await db.testimonials.insert_one(testimonial_obj.dict())
        
        if result.inserted_id:
            return testimonial_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create testimonial")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating testimonial: {str(e)}")

@router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial_data: TestimonialCreate):
    """Update testimonial"""
    try:
        testimonial_dict = testimonial_data.dict()
        testimonial_dict["updated_at"] = datetime.utcnow()
        
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": testimonial_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        updated_testimonial = await db.testimonials.find_one({"id": testimonial_id})
        return Testimonial(**updated_testimonial)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating testimonial: {str(e)}")

@router.delete("/testimonials/{testimonial_id}", response_model=MessageResponse)
async def delete_testimonial(testimonial_id: str):
    """Delete testimonial"""
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        return MessageResponse(message="Testimonial deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting testimonial: {str(e)}")

@router.put("/testimonials/{testimonial_id}/featured", response_model=MessageResponse)
async def toggle_testimonial_featured(testimonial_id: str, is_featured: bool):
    """Toggle testimonial featured status"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"is_featured": is_featured}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        status = "featured" if is_featured else "unfeatured"
        return MessageResponse(message=f"Testimonial {status} successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating testimonial: {str(e)}")