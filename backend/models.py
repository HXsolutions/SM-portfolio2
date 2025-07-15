from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
import uuid

# Contact Form Models
class ContactFormCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    service: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")  # new, read, replied

# Portfolio Models
class PortfolioItemCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    category: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=500)
    results: Dict[str, str] = Field(...)
    technologies: List[str] = Field(...)
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    is_featured: bool = False

class PortfolioItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    results: Dict[str, str]
    technologies: List[str]
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    company: str = Field(..., min_length=1, max_length=100)
    testimonial: str = Field(..., min_length=10, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    avatar_url: Optional[str] = None

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    testimonial: str
    rating: int
    avatar_url: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Service Models
class ServiceCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=500)
    icon: str = Field(..., min_length=1, max_length=10)
    features: List[str] = Field(...)
    price: str = Field(..., min_length=1, max_length=100)
    is_active: bool = True

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    features: List[str]
    price: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Experience Models
class ExperienceCreate(BaseModel):
    company: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    duration: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=500)
    achievements: List[str] = Field(...)

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    duration: str
    description: str
    achievements: List[str]
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Skills Models
class SkillCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    level: int = Field(..., ge=1, le=100)
    category: str = Field(..., min_length=1, max_length=50)

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    level: int
    category: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Stats Models
class StatsUpdate(BaseModel):
    total_sales: int = Field(..., ge=0)
    clients_served: int = Field(..., ge=0)
    years_experience: int = Field(..., ge=0)
    projects_completed: int = Field(..., ge=0)

class Stats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    total_sales: int
    clients_served: int
    years_experience: int
    projects_completed: int
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class MessageResponse(BaseModel):
    message: str
    success: bool = True

class ContactResponse(BaseModel):
    message: str
    contact_id: str
    success: bool = True