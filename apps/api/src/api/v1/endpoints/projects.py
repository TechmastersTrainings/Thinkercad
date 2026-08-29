from fastapi import APIRouter, HTTPException, status
from typing import List
import uuid
from datetime import datetime
from src.domain.projects.schemas import ProjectCreate, ProjectResponse, ProjectUpdate

router = APIRouter()

# In-memory storage for initial bootstrap
in_memory_projects = {}

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_in: ProjectCreate):
    project_id = str(uuid.uuid4())
    now = datetime.utcnow()
    project_data = {
        "id": project_id,
        "owner_id": "usr_demo_admin",
        "title": project_in.title,
        "description": project_in.description,
        "target_board_id": project_in.target_board_id,
        "circuit_data": project_in.circuit_data.dict() if project_in.circuit_data else {"components": [], "wires": [], "nets": []},
        "firmware_code": project_in.firmware_code or "// Arduino Code",
        "created_at": now,
        "updated_at": now,
    }
    in_memory_projects[project_id] = project_data
    return project_data

@router.get("/", response_model=List[ProjectResponse])
def list_projects():
    return list(in_memory_projects.values())

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str):
    if project_id not in in_memory_projects:
        raise HTTPException(status_code=404, detail="Project not found")
    return in_memory_projects[project_id]

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, project_in: ProjectUpdate):
    if project_id not in in_memory_projects:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project = in_memory_projects[project_id]
    if project_in.title is not None:
        project["title"] = project_in.title
    if project_in.description is not None:
        project["description"] = project_in.description
    if project_in.circuit_data is not None:
        project["circuit_data"] = project_in.circuit_data.dict()
    if project_in.firmware_code is not None:
        project["firmware_code"] = project_in.firmware_code
    project["updated_at"] = datetime.utcnow()
    
    in_memory_projects[project_id] = project
    return project
