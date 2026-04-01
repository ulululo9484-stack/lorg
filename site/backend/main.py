from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

import aiofiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/config.js")
def get_config():
    env_variables = {
        "API_URL": "http://localhost:8000"
    }
    content = ", ".join([f"{k}: '{v}'" for k, v in env_variables.items()])
    content = f"window.ENV = {{{content}}};"
    
    return Response(
        content=content, 
        media_type="application/javascript"
    )

@app.get("/tool/{toolname}")
async def get_tool(toolname: str):
    toolpath = f"frontend/html/tools/{toolname}.html"
    async with aiofiles.open(toolpath, "r", encoding='utf-8') as file:
        text_content = await file.read()

    return Response(
        text_content,
        media_type="text/html"
    )

app.mount("/", StaticFiles(directory="frontend", html=True), name="static")