from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from models import Stats, StatsUpdate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/stats", response_model=Stats)
async def get_stats():
    """Get current portfolio stats"""
    try:
        stats = await db.stats.find_one(sort=[("updated_at", -1)])
        if not stats:
            # Return default stats if none exist
            default_stats = Stats(
                total_sales=4000000,
                clients_served=500,
                years_experience=8,
                projects_completed=750
            )
            await db.stats.insert_one(default_stats.dict())
            return default_stats
        return Stats(**stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

@router.put("/stats", response_model=Stats)
async def update_stats(stats_data: StatsUpdate):
    """Update portfolio stats"""
    try:
        stats_dict = stats_data.dict()
        stats_obj = Stats(**stats_dict)
        
        # Delete old stats and insert new ones
        await db.stats.delete_many({})
        result = await db.stats.insert_one(stats_obj.dict())
        
        if result.inserted_id:
            return stats_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to update stats")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating stats: {str(e)}")