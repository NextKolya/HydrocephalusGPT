from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os 
from dotenv import load_dotenv

from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv('gemini_api_key')
if not api_key: 
	raise RuntimeError('Gemini api key is not defined')
client = genai.Client(api_key=api_key)

class Prompt(BaseModel):
	text: str

AI_responses = FastAPI()
AI_responses.add_middleware(
	CORSMiddleware,
	allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@AI_responses.post('/responses')
async def AIresponse(prompt: Prompt):
	def generate():
		return client.models.generate_content(
			model='gemini-2.5-flash', contents=prompt.text,
			config=types.GenerateContentConfig(
				thinking_config=types.ThinkingConfig(thinking_budget=0)
			),
		)
	response = await run_in_threadpool(generate)
	return {"answer": response.text or "Error with generating answer"}


