from fastapi import APIRouter, WebSocket
import logging
from mc_screen import manage_mc

router = APIRouter()

@router.websocket("/rcon")
async def connect_rcon(websocket: WebSocket):
    await websocket.accept()
    await manage_mc(websocket)