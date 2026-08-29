from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class CircuitDataSchema(BaseModel):
    components: List[Dict[str, Any]] = []
    wires: List[Dict[str, Any]] = []
    nets: List[Dict[str, Any]] = []

class ProjectBase(BaseModel):
    title: str = Field(..., example="Smart Agriculture Node")
    description: Optional[str] = Field(None, example="ESP32 WiFi connected soil moisture system")
    target_board_id: str = Field(..., example="board-esp32-devkit")

class ProjectCreate(ProjectBase):
    circuit_data: Optional[CircuitDataSchema] = None
    firmware_code: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    circuit_data: Optional[CircuitDataSchema] = None
    firmware_code: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: str
    owner_id: str
    circuit_data: CircuitDataSchema
    firmware_code: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
