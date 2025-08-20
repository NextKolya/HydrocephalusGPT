from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os 
from dotenv import load_dotenv

import google.generativeai as genai
from google.genai import types

load_dotenv()
api_key = os.getenv('gemini_api_key')
if not api_key: 
	raise RuntimeError('Gemini api key is not defined')
genai.configure(api_key=api_key)

class Prompt(BaseModel):
	text: str

AI_responses = FastAPI()
AI_responses.add_middleware(
	CORSMiddleware,
	allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@AI_responses.post('/responses')
async def AIresponse(prompt: Prompt):
	def generate():
		return genai.generate_text(
			model="gemini-2.5-flash",
			prompt=prompt.text,
			max_output_tokens=512,
			temperature=0.0,
		)
		
	try:
		response = await run_in_threadpool(generate)
		return {"answer": response.output_text or "Error with generating answer"}
	except Exception as error:
		print("AI response ERROR: ", error)
		return{"answer": f"Error: {error}"}

