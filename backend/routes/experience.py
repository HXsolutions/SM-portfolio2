from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from models import Experience, ExperienceCreate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Get all experience entries"""
    try:
        experience = await db.experience.find().sort("order", 1).to_list(100)
        return [Experience(**exp) for exp in experience]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching experience: {str(e)}")

@router.get("/experience/{experience_id}", response_model=Experience)
async def get_experience_item(experience_id: str):
    """Get specific experience item"""
    try:
        experience = await db.experience.find_one({"id": experience_id})
        if not experience:
            raise HTTPException(status_code=404, detail="Experience not found")
        return Experience(**experience)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching experience: {str(e)}")

@router.post("/experience", response_model=Experience)
async def create_experience(experience_data: ExperienceCreate):
    """Create new experience entry"""
    try:
        experience_dict = experience_data.dict()
        experience_obj = Experience(**experience_dict)
        
        result = await db.experience.insert_one(experience_obj.dict())
        
        if result.inserted_id:
            return experience_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create experience")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating experience: {str(e)}")

@router.put("/experience/{experience_id}", response_model=Experience)
async def update_experience(experience_id: str, experience_data: ExperienceCreate):
    """Update experience entry"""
    try:
        experience_dict = experience_data.dict()
        experience_dict["updated_at"] = datetime.utcnow()
        
        result = await db.experience.update_one(
            {"id": experience_id},
            {"$set": experience_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        updated_experience = await db.experience.find_one({"id": experience_id})
        return Experience(**updated_experience)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating experience: {str(e)}")

@router.delete("/experience/{experience_id}", response_model=MessageResponse)
async def delete_experience(experience_id: str):
    """Delete experience entry"""
    try:
        result = await db.experience.delete_one({"id": experience_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        return MessageResponse(message="Experience deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting experience: {str(e)}")

@router.put("/experience/{experience_id}/order", response_model=MessageResponse)
async def update_experience_order(experience_id: str, order: int):
    """Update experience order"""
    try:
        result = await db.experience.update_one(
            {"id": experience_id},
            {"$set": {"order": order}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        return MessageResponse(message="Experience order updated successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating experience order: {str(e)}")