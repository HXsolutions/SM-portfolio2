from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Load environment variables FIRST before importing routes
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Import route modules AFTER loading .env
from routes.contact import router as contact_router
from routes.portfolio import router as portfolio_router
from routes.testimonials import router as testimonials_router
from routes.services import router as services_router
from routes.stats import router as stats_router
from routes.experience import router as experience_router
from routes.skills import router as skills_router

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(
    title="Sohaib Mushtaq Portfolio API",
    description="Portfolio website backend API",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Sohaib Mushtaq Portfolio API is running!", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include route modules
api_router.include_router(contact_router, tags=["Contact"])
api_router.include_router(portfolio_router, tags=["Portfolio"])
api_router.include_router(testimonials_router, tags=["Testimonials"])
api_router.include_router(services_router, tags=["Services"])
api_router.include_router(stats_router, tags=["Stats"])
api_router.include_router(experience_router, tags=["Experience"])
api_router.include_router(skills_router, tags=["Skills"])

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data if empty"""
    logger.info("Starting up Portfolio API...")
    
    # Create indexes for better performance
    await db.contacts.create_index("email")
    await db.contacts.create_index("created_at")
    await db.portfolio.create_index("category")
    await db.portfolio.create_index("is_featured")
    await db.testimonials.create_index("is_featured")
    await db.services.create_index("is_active")
    await db.experience.create_index("order")
    await db.skills.create_index("category")
    await db.skills.create_index("level")
    
    logger.info("Database indexes created successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")
