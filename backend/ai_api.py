from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os 
from dotenv import load_dotenv

import google.generativeai as genai

load_dotenv()
api_key = os.getenv('gemini_api_key')
genai.configure(api_key)
if not api_key: 
	raise RuntimeError('Gemini api key is not defined')
genai.configure(api_key=api_key)

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
		return genai.models.generate_text(
			model='gemini-2.5-flash', 
			prompt=prompt.text,
			temperatue=0.0,
			max_output_tokens=512
		)
	response = await run_in_threadpool(generate)
	return {"answer": response.text or "Error with generating answer"}


