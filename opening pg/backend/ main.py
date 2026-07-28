from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Prompt(BaseModel):
    prompt: str


@app.post("/generate")
async def generate_text(data: Prompt):

    try:

        response = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[
                {
                    "role": "system",
                    "content": "You are a professional AI writing assistant."
                },
                {
                    "role": "user",
                    "content": data.prompt
                }
            ],

            temperature=0.7,

            max_tokens=500

        )

        return {
            "response":
            response.choices[0].message.content
        }

    except Exception as e:

        return {
            "error": str(e)
        } 