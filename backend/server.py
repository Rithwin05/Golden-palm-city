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
    description: Optional[str] = None
    gallery: List[str] = []
    amenities: List[str] = []
    masterplan_url: Optional[str] = None
    area: Optional[str] = None
    plot_sizes: Optional[str] = None
    connectivity: List[str] = []


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
        description=(
            "Golden Palm City is the flagship cinematic future-land of Kings Pride — "
            "a peaceful, palm-lined sanctuary engineered for early-discovery owners. "
            "Premium villa plots arranged around landscaped boulevards, water reflections, "
            "and a monumental entrance gate, just 1 KM off the Bangalore highway."
        ),
        gallery=[
            "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/uj7ps9ag_project_1.png",
            "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/0jqwwqds_Hero%20section.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/896f0c5c73a9e5a00c3abfaa2af3069c10b20610ecf0ceaf959d28906546262b.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ca8072070e244c432efd210c4c6e653bf0822d669fa0f02950920d92dff04be0.png",
        ],
        amenities=[
            "Landscaped Parks & Gardens",
            "Clubhouse & Community Space",
            "Palm-lined Boulevards",
            "Water Reflection Features",
            "Children's Play Areas",
            "Wellness & Walking Trails",
            "24/7 Security & Surveillance",
            "Underground Utilities",
        ],
        area="Master-planned villa-plot community",
        plot_sizes="167 — 600 sq.yd plots",
        connectivity=[
            "1 KM from Bangalore Highway",
            "45 min from RGIA Airport",
            "Shadnagar Railway Station — 8 KM",
            "ORR Junction — 35 min",
        ],
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
        description=(
            "Vantage Farms is a serene farm-plot community engineered for the early "
            "investor — sun-baked geography, NA-approved titles, and infrastructure-ready land "
            "moments from the Bangalore highway."
        ),
        gallery=[
            "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/gbc6vgmh_project2.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/896f0c5c73a9e5a00c3abfaa2af3069c10b20610ecf0ceaf959d28906546262b.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ea9a4f167dea7e812900d99df9d8ee85691b94edf8f0e6b54e93eee32acc7635.png",
        ],
        amenities=[
            "Precast Boundary Wall",
            "Street Lighting",
            "Transformer Infrastructure",
            "24/7 CCTV Surveillance",
            "Wide Internal Roads",
        ],
        area="Premium farm-plot enclave",
        plot_sizes="200 — 1000 sq.yd",
        connectivity=[
            "1 KM from Bangalore Highway",
            "Shadnagar — 10 min",
            "RGIA Airport — 50 min",
        ],
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
        description=(
            "Chandan Valley folds into a hillside near Shamshabad — a quiet, eco-conscious "
            "retreat with scenic views, breathing landscapes, and a slower rhythm just minutes "
            "from Hyderabad's international airport."
        ),
        gallery=[
            "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/9p8rxtk4_project3.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ca8072070e244c432efd210c4c6e653bf0822d669fa0f02950920d92dff04be0.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/896f0c5c73a9e5a00c3abfaa2af3069c10b20610ecf0ceaf959d28906546262b.png",
        ],
        amenities=[
            "Scenic Hill Views",
            "Eco-Friendly Layout",
            "24/7 Security",
            "Walking Trails",
            "Native Landscaping",
        ],
        area="Hillside eco-retreat",
        plot_sizes="200 — 500 sq.yd",
        connectivity=[
            "Shamshabad — 5 min",
            "RGIA Airport — 15 min",
            "ORR Junction — 10 min",
        ],
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
        description=(
            "Doctor's Colony is a tightly composed, contemporary villa community at Balanagar — "
            "modern architectural language, a green serene atmosphere, and a secure, well-connected "
            "address for families building legacies."
        ),
        gallery=[
            "https://customer-assets.emergentagent.com/job_902851f7-4141-441a-b04e-2cfc5affd28f/artifacts/obhcu0a2_project4.png",
            "https://static.prod-images.emergentagent.com/jobs/902851f7-4141-441a-b04e-2cfc5affd28f/images/ca8072070e244c432efd210c4c6e653bf0822d669fa0f02950920d92dff04be0.png",
        ],
        amenities=[
            "Modern Contemporary Architecture",
            "Landscaped Garden Pathways",
            "24/7 Security",
            "Smart Street Lighting",
            "Green Open Spaces",
        ],
        area="Boutique villa community",
        plot_sizes="150 — 400 sq.yd",
        connectivity=[
            "Balanagar Junction — 5 min",
            "Shadnagar — 10 min",
            "Bangalore Highway — 12 min",
        ],
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
