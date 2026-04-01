import logging

from aiodocker import Docker

from fastapi import WebSocket, WebSocketDisconnect
logger = logging.getLogger("MC")

CONTAINER_NAME = "mc_server"

async def manage_mc(websocket: WebSocket):
    client = Docker()
    try:
        container = await client.containers.get(CONTAINER_NAME)
        tail = await container.log(tail=100, stderr=True, stdout=True)

        for log in tail:
            await websocket.send_text(log)

        async for line in container.log(stream=True, follow=True, tail=0, stderr=True, stdout=True):
            await websocket.send_text(line)
    except WebSocketDisconnect:
        logger.info("Stop manage...")
    finally:
        await client.close()