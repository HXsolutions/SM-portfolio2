from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from models import Skill, SkillCreate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/skills", response_model=List[Skill])
async def get_skills(category: str = None):
    """Get all skills with optional category filter"""
    try:
        query = {}
        if category:
            query["category"] = category
        
        skills = await db.skills.find(query).sort("level", -1).to_list(100)
        return [Skill(**skill) for skill in skills]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching skills: {str(e)}")

@router.get("/skills/categories", response_model=List[str])
async def get_skill_categories():
    """Get all unique skill categories"""
    try:
        categories = await db.skills.distinct("category")
        return sorted(categories)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")

@router.get("/skills/{skill_id}", response_model=Skill)
async def get_skill(skill_id: str):
    """Get specific skill"""
    try:
        skill = await db.skills.find_one({"id": skill_id})
        if not skill:
            raise HTTPException(status_code=404, detail="Skill not found")
        return Skill(**skill)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching skill: {str(e)}")

@router.post("/skills", response_model=Skill)
async def create_skill(skill_data: SkillCreate):
    """Create new skill"""
    try:
        skill_dict = skill_data.dict()
        skill_obj = Skill(**skill_dict)
        
        result = await db.skills.insert_one(skill_obj.dict())
        
        if result.inserted_id:
            return skill_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create skill")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating skill: {str(e)}")

@router.put("/skills/{skill_id}", response_model=Skill)
async def update_skill(skill_id: str, skill_data: SkillCreate):
    """Update skill"""
    try:
        skill_dict = skill_data.dict()
        skill_dict["updated_at"] = datetime.utcnow()
        
        result = await db.skills.update_one(
            {"id": skill_id},
            {"$set": skill_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Skill not found")
        
        updated_skill = await db.skills.find_one({"id": skill_id})
        return Skill(**updated_skill)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating skill: {str(e)}")

@router.delete("/skills/{skill_id}", response_model=MessageResponse)
async def delete_skill(skill_id: str):
    """Delete skill"""
    try:
        result = await db.skills.delete_one({"id": skill_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Skill not found")
        
        return MessageResponse(message="Skill deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting skill: {str(e)}")