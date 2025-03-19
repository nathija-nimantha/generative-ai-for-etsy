from fastapi import FastAPI
from models import ProductRequest, SEORequest, MarketingRequest
from services import generate_product_description, generate_seo_tags, generate_marketing_content
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="E-Commerce AI Agent")

@app.post("/generate_description")
async def generate_description(request: ProductRequest):
    return {"description": await generate_product_description(request.name, request.category, request.details)}

@app.post("/generate_tags")
async def generate_tags(request: SEORequest):
    return {"tags": await generate_seo_tags(request.keywords)}

@app.post("/generate_marketing_content")
async def generate_marketing(request: MarketingRequest):
    return {"marketing_content": await generate_marketing_content(request.audience, request.platform)}

@app.get("/")
def health_check():
    return {"status": "AI Agent is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)