from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Golden Palm City — Concierge API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ===== Concierge Lead Models =====
class ConciergeInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    interest: Optional[str] = None
    message: Optional[str] = None
    source: str = "website"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ConciergeInquiryCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    interest: Optional[str] = None
    message: Optional[str] = None


# ===== Project Models =====
class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    slug: str
    name: str
    tagline: str
    location: str
    image_url: str
    price_from: Optional[str] = None
    highlights: List[str] = []
    approvals: List[str] = []
    is_flagship: bool = False


# ===== Static Projects (used by the experience) =====
PROJECTS: List[Project] = [
    Project(
        id="golden-palm-city",
        slug="golden-palm-city",
        name="Golden Palm City",
        tagline="The Perfect Balance of Luxury & Nature",
        location="Shadnagar, Rangareddyguda",
        image_url="https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/uj7ps9ag_project_1.png",
        price_from="INR 5,000 / sq.yd",
        highlights=[
            "1 KM from Bangalore Highway",
            "24/7 CCTV Surveillance",
            "Transformer & Street Lights",
            "Overall Precast Wall",
            "Landscaped Parks & Gardens",
            "Clubhouse & Community Space",
        ],
        approvals=["RERA", "HMDA"],
        is_flagship=True,
    ),
    Project(
        id="vantage-farms",
        slug="vantage-farms",
        name="Vantage Farms",
        tagline="Your Dream Property at an Unbeatable Price",
        location="Shadnagar, Rangareddyguda",
        image_url="https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/gbc6vgmh_project2.png",
        price_from="INR 5,000 / sq.yd",
        highlights=[
            "1 KM from Bangalore Highway",
            "24/7 CCTV Surveillance",
            "Transformer & Street Lights",
            "Non-Agriculture Approved",
        ],
        approvals=["NA Approved"],
    ),
    Project(
        id="chandan-valley",
        slug="chandan-valley",
        name="Chandan Valley",
        tagline="Your Dream Property in Nature's Lap",
        location="Shamshabad, Hyderabad",
        image_url="https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/9p8rxtk4_project3.png",
        price_from=None,
        highlights=[
            "Scenic Hill Views",
            "Eco-Friendly Living",
            "24/7 Security",
            "Well Connected Location",
        ],
        approvals=["RERA", "HMDA"],
    ),
    Project(
        id="doctors-colony",
        slug="doctors-colony",
        name="Doctor's Colony",
        tagline="Your Dream Property Awaits You",
        location="Balanagar, Shadnagar",
        image_url="https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/obhcu0a2_project4.png",
        price_from=None,
        highlights=[
            "Modern Contemporary Architecture",
            "Green & Serene Environment",
            "24/7 Safe & Secure Community",
            "Well Connected Location",
        ],
        approvals=["Approved"],
    ),
]


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "Golden Palm City — Concierge API", "status": "ok"}


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    return PROJECTS


@api_router.get("/projects/{slug}", response_model=Project)
async def get_project(slug: str):
    for p in PROJECTS:
        if p.slug == slug:
            return p
    raise HTTPException(status_code=404, detail="Project not found")


@api_router.post("/concierge/inquiries", response_model=ConciergeInquiry)
async def create_inquiry(payload: ConciergeInquiryCreate):
    inquiry = ConciergeInquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.concierge_inquiries.insert_one(doc)
    return inquiry


@api_router.get("/concierge/inquiries", response_model=List[ConciergeInquiry])
async def list_inquiries():
    docs = await db.concierge_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
