from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from models import PortfolioItem, PortfolioItemCreate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio_items(category: Optional[str] = None, featured_only: bool = False):
    """Get portfolio items with optional filtering"""
    try:
        query = {}
        if category and category != "All":
            query["category"] = category
        if featured_only:
            query["is_featured"] = True
        
        items = await db.portfolio.find(query).sort("created_at", -1).to_list(100)
        return [PortfolioItem(**item) for item in items]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio items: {str(e)}")

@router.get("/portfolio/{item_id}", response_model=PortfolioItem)
async def get_portfolio_item(item_id: str):
    """Get specific portfolio item"""
    try:
        item = await db.portfolio.find_one({"id": item_id})
        if not item:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        return PortfolioItem(**item)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio item: {str(e)}")

@router.post("/portfolio", response_model=PortfolioItem)
async def create_portfolio_item(item_data: PortfolioItemCreate):
    """Create new portfolio item"""
    try:
        item_dict = item_data.dict()
        item_obj = PortfolioItem(**item_dict)
        
        result = await db.portfolio.insert_one(item_obj.dict())
        
        if result.inserted_id:
            return item_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create portfolio item")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating portfolio item: {str(e)}")

@router.put("/portfolio/{item_id}", response_model=PortfolioItem)
async def update_portfolio_item(item_id: str, item_data: PortfolioItemCreate):
    """Update portfolio item"""
    try:
        item_dict = item_data.dict()
        item_dict["updated_at"] = datetime.utcnow()
        
        result = await db.portfolio.update_one(
            {"id": item_id},
            {"$set": item_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        
        updated_item = await db.portfolio.find_one({"id": item_id})
        return PortfolioItem(**updated_item)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating portfolio item: {str(e)}")

@router.delete("/portfolio/{item_id}", response_model=MessageResponse)
async def delete_portfolio_item(item_id: str):
    """Delete portfolio item"""
    try:
        result = await db.portfolio.delete_one({"id": item_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        
        return MessageResponse(message="Portfolio item deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting portfolio item: {str(e)}")

@router.get("/portfolio/categories", response_model=List[str])
async def get_portfolio_categories():
    """Get all unique portfolio categories"""
    try:
        categories = await db.portfolio.distinct("category")
        return sorted(categories)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")