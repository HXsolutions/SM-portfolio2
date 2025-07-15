import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample data
sample_services = [
    {
        "id": "service-1",
        "title": "Business Consulting",
        "description": "Strategic guidance for scaling your e-commerce business from startup to 6-figures",
        "icon": "💼",
        "features": ["Market Analysis", "Business Strategy", "Growth Planning", "Revenue Optimization"],
        "price": "Starting at $150/hour",
        "is_active": True
    },
    {
        "id": "service-2",
        "title": "Shopify Store Development",
        "description": "Custom Shopify stores designed to convert visitors into customers",
        "icon": "🛍️",
        "features": ["Custom Design", "App Integration", "Performance Optimization", "Mobile Responsive"],
        "price": "Starting at $2,500",
        "is_active": True
    },
    {
        "id": "service-3",
        "title": "Amazon Store Setup",
        "description": "Complete Amazon seller account setup and optimization for maximum visibility",
        "icon": "📦",
        "features": ["Account Setup", "Product Listing", "SEO Optimization", "PPC Management"],
        "price": "Starting at $1,200",
        "is_active": True
    },
    {
        "id": "service-4",
        "title": "Brand Design",
        "description": "Professional brand identity design that resonates with your target audience",
        "icon": "🎨",
        "features": ["Logo Design", "Brand Guidelines", "Marketing Materials", "Social Media Assets"],
        "price": "Starting at $800",
        "is_active": True
    },
    {
        "id": "service-5",
        "title": "App Development",
        "description": "Custom mobile and web applications for iOS, Android, and web platforms",
        "icon": "📱",
        "features": ["iOS Development", "Android Development", "Web Apps", "API Integration"],
        "price": "Starting at $5,000",
        "is_active": True
    },
    {
        "id": "service-6",
        "title": "SEO & Digital Marketing",
        "description": "Comprehensive digital marketing strategies to boost your online presence",
        "icon": "📈",
        "features": ["SEO Optimization", "Content Marketing", "Social Media", "PPC Advertising"],
        "price": "Starting at $1,000/month",
        "is_active": True
    }
]

sample_portfolio = [
    {
        "id": "portfolio-1",
        "title": "Fashion Brand Scale-up",
        "category": "E-commerce",
        "description": "Scaled a fashion startup from $50K to $500K annual revenue",
        "results": {
            "revenue": "900% increase",
            "conversion": "45% improvement",
            "traffic": "300% growth"
        },
        "technologies": ["Shopify", "Facebook Ads", "Google Analytics", "Klaviyo"],
        "is_featured": True
    },
    {
        "id": "portfolio-2",
        "title": "Amazon FBA Optimization",
        "category": "Amazon",
        "description": "Optimized product listings and PPC campaigns for electronics brand",
        "results": {
            "sales": "250% increase",
            "ranking": "Top 3 in category",
            "roi": "400% ROAS"
        },
        "technologies": ["Amazon Seller Central", "Helium 10", "PPC Management", "A/B Testing"],
        "is_featured": True
    },
    {
        "id": "portfolio-3",
        "title": "SaaS Mobile App",
        "category": "Development",
        "description": "Developed cross-platform mobile app for productivity SaaS company",
        "results": {
            "downloads": "50K+ downloads",
            "rating": "4.8 star rating",
            "retention": "85% user retention"
        },
        "technologies": ["React Native", "Node.js", "MongoDB", "Firebase"],
        "is_featured": True
    },
    {
        "id": "portfolio-4",
        "title": "Health & Wellness Brand",
        "category": "Branding",
        "description": "Complete brand identity and digital presence for wellness startup",
        "results": {
            "engagement": "200% increase",
            "followers": "25K+ followers",
            "sales": "150% boost"
        },
        "technologies": ["Adobe Creative Suite", "Figma", "WordPress", "Social Media"],
        "is_featured": False
    }
]

sample_testimonials = [
    {
        "id": "testimonial-1",
        "name": "Sarah Johnson",
        "position": "CEO",
        "company": "Fashion Forward",
        "testimonial": "Sohaib transformed our struggling online store into a 6-figure business. His expertise in Shopify and marketing strategy is unmatched.",
        "rating": 5,
        "is_featured": True
    },
    {
        "id": "testimonial-2",
        "name": "Mike Chen",
        "position": "Founder",
        "company": "TechGadgets Pro",
        "testimonial": "Working with Sohaib on our Amazon optimization was the best decision we made. Our sales tripled in just 6 months.",
        "rating": 5,
        "is_featured": True
    },
    {
        "id": "testimonial-3",
        "name": "Emma Rodriguez",
        "position": "Marketing Director",
        "company": "WellnessHub",
        "testimonial": "The mobile app Sohaib developed for us exceeded all expectations. The user experience is incredible and our customers love it.",
        "rating": 5,
        "is_featured": True
    },
    {
        "id": "testimonial-4",
        "name": "David Thompson",
        "position": "Owner",
        "company": "Home Decor Plus",
        "testimonial": "Sohaib's SEO and digital marketing strategies helped us dominate our niche. We're now the #1 result for our main keywords.",
        "rating": 5,
        "is_featured": False
    }
]

sample_experience = [
    {
        "id": "experience-1",
        "company": "Amazon Solutions Pro",
        "position": "Senior E-commerce Consultant",
        "duration": "2021 - Present",
        "description": "Leading e-commerce strategy for enterprise clients, generating $2M+ in additional revenue",
        "achievements": [
            "Increased client revenue by 150% on average",
            "Managed 50+ Amazon seller accounts",
            "Developed automated inventory management systems"
        ],
        "order": 1
    },
    {
        "id": "experience-2",
        "company": "Extreme Commerce",
        "position": "Lead Shopify Developer",
        "duration": "2019 - 2021",
        "description": "Specialized in high-converting Shopify store development for scaling businesses",
        "achievements": [
            "Built 100+ Shopify stores",
            "Average conversion rate improvement of 35%",
            "Trained 20+ junior developers"
        ],
        "order": 2
    },
    {
        "id": "experience-3",
        "company": "TEVTA (Technical Education)",
        "position": "E-commerce Trainer",
        "duration": "2018 - 2019",
        "description": "Conducted training programs for aspiring e-commerce entrepreneurs",
        "achievements": [
            "Trained 500+ students",
            "95% student satisfaction rate",
            "Developed comprehensive curriculum"
        ],
        "order": 3
    },
    {
        "id": "experience-4",
        "company": "Freelance Consultant",
        "position": "Independent E-commerce Consultant",
        "duration": "2016 - 2018",
        "description": "Provided consulting services to small and medium businesses",
        "achievements": [
            "Served 100+ clients",
            "Achieved Top Rated Plus status on Upwork",
            "Generated $1M+ in client revenue"
        ],
        "order": 4
    }
]

sample_skills = [
    {"id": "skill-1", "name": "E-commerce Strategy", "level": 95, "category": "Business"},
    {"id": "skill-2", "name": "Shopify Development", "level": 90, "category": "Development"},
    {"id": "skill-3", "name": "Amazon FBA", "level": 88, "category": "E-commerce"},
    {"id": "skill-4", "name": "Digital Marketing", "level": 85, "category": "Marketing"},
    {"id": "skill-5", "name": "Brand Development", "level": 80, "category": "Design"},
    {"id": "skill-6", "name": "Mobile App Development", "level": 75, "category": "Development"},
    {"id": "skill-7", "name": "SEO Optimization", "level": 92, "category": "Marketing"},
    {"id": "skill-8", "name": "Business Consulting", "level": 93, "category": "Business"}
]

sample_stats = {
    "id": "stats-1",
    "total_sales": 4000000,
    "clients_served": 500,
    "years_experience": 8,
    "projects_completed": 750
}

async def seed_database():
    """Seed the database with sample data"""
    print("🌱 Seeding database with sample data...")
    
    try:
        # Clear existing data
        await db.services.delete_many({})
        await db.portfolio.delete_many({})
        await db.testimonials.delete_many({})
        await db.experience.delete_many({})
        await db.skills.delete_many({})
        await db.stats.delete_many({})
        
        # Insert sample data
        await db.services.insert_many(sample_services)
        await db.portfolio.insert_many(sample_portfolio)
        await db.testimonials.insert_many(sample_testimonials)
        await db.experience.insert_many(sample_experience)
        await db.skills.insert_many(sample_skills)
        await db.stats.insert_one(sample_stats)
        
        print("✅ Database seeded successfully!")
        print(f"   - {len(sample_services)} services")
        print(f"   - {len(sample_portfolio)} portfolio items")
        print(f"   - {len(sample_testimonials)} testimonials")
        print(f"   - {len(sample_experience)} experience items")
        print(f"   - {len(sample_skills)} skills")
        print(f"   - 1 stats record")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())