from fastapi import APIRouter
from src.api.v1.endpoints import projects, simulation, ai_tutor

api_router = APIRouter()
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(simulation.router, prefix="/simulation", tags=["simulation"])
api_router.include_router(ai_tutor.router, prefix="/ai", tags=["ai_tutor"])
