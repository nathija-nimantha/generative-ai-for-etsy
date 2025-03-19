import httpx
from config import GROQ_API_KEY

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

async def generate_text(prompt: str):
    if not GROQ_API_KEY:
        return "Error: Missing API Key"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                GROQ_API_URL,
                headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
                json={
                    "model": "mixtral-8x7b-32768",
                    "messages": [
                        {"role": "system", "content": "You are a helpful AI assistant."},
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 200
                },
                timeout=10
            )

            response.raise_for_status()
            response_data = response.json()

            if "choices" not in response_data or not response_data["choices"]:
                return "Error: Unexpected API response"

            return response_data["choices"][0].get("message", {}).get("content", "").strip()

        except httpx.HTTPStatusError as e:
            return f"HTTP Error: {e.response.status_code} - {e.response.text}"
        except httpx.RequestError as e:
            return f"Request Error: {str(e)}"
        except Exception as e:
            return f"Unexpected Error: {str(e)}"


async def generate_product_description(name: str, category: str, details: str):
    prompt = f"Write a compelling product description for {name} in {category}. Details: {details}."
    return await generate_text(prompt)

async def generate_seo_tags(keywords: list):
    prompt = f"Generate SEO-friendly tags for these keywords: {', '.join(keywords)}."
    return await generate_text(prompt)

async def generate_marketing_content(audience: str, platform: str):
    prompt = f"Create a marketing campaign message targeting {audience} on {platform}."
    return await generate_text(prompt)
