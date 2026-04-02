from fastapi import APIRouter, WebSocket
from mc_screen import manage_mc, execute_mc
from pydantic import BaseModel

class CommandModel(BaseModel):
    command: str

router = APIRouter()

@router.post("/rcon/execute")
async def execute_command(model: CommandModel):
    return {
        "answer": await execute_mc(model.command)
    }

@router.websocket("/rcon/stream")
async def connect_rcon(websocket: WebSocket):
    await websocket.accept()
    await manage_mc(websocket)