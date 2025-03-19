from pydantic import BaseModel
from typing import List

class ProductRequest(BaseModel):
    name: str
    category: str
    details: str

class SEORequest(BaseModel):
    keywords: List[str]

class MarketingRequest(BaseModel):
    audience: str
    platform: str
