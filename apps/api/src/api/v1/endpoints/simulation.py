from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
import asyncio

router = APIRouter()

class SimulationConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = SimulationConnectionManager()

@router.websocket("/ws/{project_id}")
async def simulation_websocket(websocket: WebSocket, project_id: str):
    await manager.connect(websocket)
    try:
        await websocket.send_json({
            "event": "CONNECTED",
            "project_id": project_id,
            "message": f"Simulation WebSocket stream established for project {project_id}"
        })
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            # Echo telemetry or process simulation frame sync
            await websocket.send_json({
                "event": "TELEMETRY_ACK",
                "received": payload
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
