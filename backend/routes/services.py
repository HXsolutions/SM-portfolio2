from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

from ..models import Service, ServiceCreate, MessageResponse

router = APIRouter()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/services", response_model=List[Service])
async def get_services(active_only: bool = True):
    """Get services with optional active filter"""
    try:
        query = {}
        if active_only:
            query["is_active"] = True
        
        services = await db.services.find(query).sort("created_at", -1).to_list(100)
        return [Service(**service) for service in services]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching services: {str(e)}")

@router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    """Get specific service"""
    try:
        service = await db.services.find_one({"id": service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        return Service(**service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching service: {str(e)}")

@router.post("/services", response_model=Service)
async def create_service(service_data: ServiceCreate):
    """Create new service"""
    try:
        service_dict = service_data.dict()
        service_obj = Service(**service_dict)
        
        result = await db.services.insert_one(service_obj.dict())
        
        if result.inserted_id:
            return service_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create service")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating service: {str(e)}")

@router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service_data: ServiceCreate):
    """Update service"""
    try:
        service_dict = service_data.dict()
        service_dict["updated_at"] = datetime.utcnow()
        
        result = await db.services.update_one(
            {"id": service_id},
            {"$set": service_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        updated_service = await db.services.find_one({"id": service_id})
        return Service(**updated_service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating service: {str(e)}")

@router.delete("/services/{service_id}", response_model=MessageResponse)
async def delete_service(service_id: str):
    """Delete service"""
    try:
        result = await db.services.delete_one({"id": service_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return MessageResponse(message="Service deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting service: {str(e)}")

@router.put("/services/{service_id}/active", response_model=MessageResponse)
async def toggle_service_active(service_id: str, is_active: bool):
    """Toggle service active status"""
    try:
        result = await db.services.update_one(
            {"id": service_id},
            {"$set": {"is_active": is_active}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        status = "activated" if is_active else "deactivated"
        return MessageResponse(message=f"Service {status} successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating service: {str(e)}")