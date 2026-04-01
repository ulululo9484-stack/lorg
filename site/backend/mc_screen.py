import docker
import logging

from fastapi import WebSocket
logger = logging.getLogger("MC")

CONTAINER_NAME = "mc_server"

async def manage_mc(websocket: WebSocket):
    client = docker.from_env()
    try:
        container = client.containers.get(CONTAINER_NAME)
        tail = container.logs(tail=100).decode('utf-8')
        for log in tail.split("\n"):
            await websocket.send_text(log)

        for line in container.logs(stream=True, follow=True, tail=0):
            log_line = line.decode('utf-8').strip()
            await websocket.send_text(log_line)

    except Exception:
        pass
    finally:
        client.close()