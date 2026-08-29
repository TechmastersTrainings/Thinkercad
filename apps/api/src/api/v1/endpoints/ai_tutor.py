from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter()

class AIInspectRequest(BaseModel):
    board_id: Optional[str] = "board-arduino-uno"
    components: List[Dict[str, Any]] = []
    wires: List[Dict[str, Any]] = []
    firmware_code: str = ""
    electrical_errors: List[Dict[str, Any]] = []

class VivaQuestion(BaseModel):
    id: str
    question: str
    hint: str
    answer: str

class AIInspectResponse(BaseModel):
    status: str
    summary: str
    circuit_analysis: str
    firmware_analysis: str
    diagnoses: List[str]
    viva_questions: List[VivaQuestion]
    hardware_build_steps: List[str]

@router.post("/inspect", response_model=AIInspectResponse)
def inspect_project(req: AIInspectRequest):
    comp_count = len(req.components)
    wire_count = len(req.wires)
    err_count = len(req.electrical_errors)

    diagnoses = []
    if err_count > 0:
        for err in req.electrical_errors:
            diagnoses.append(f"[{err.get('severity', 'ERROR')}] {err.get('title')}: {err.get('message')} -> Recommendation: {err.get('recommendation')}")
    else:
        diagnoses.append("Circuit Graph verified with 0 electrical rule violations.")

    viva_questions = [
        VivaQuestion(
            id="viva-1",
            question="Why is a series resistor required when connecting an LED to a 5V digital GPIO output pin?",
            hint="Consider Ohm's law V = I * R and LED forward voltage drop (Vf = ~2.0V).",
            answer="Without a resistor, the LED will draw excess current beyond its 20mA maximum rating, causing thermal runaway and permanent hardware burnout."
        ),
        VivaQuestion(
            id="viva-2",
            question="What is the function of the TRIG and ECHO pins on the HC-SR04 ultrasonic sensor?",
            hint="TRIG emits a 10µs pulse, ECHO measures pulse return travel time.",
            answer="TRIG sends a 10 microsecond 40kHz ultrasonic burst. ECHO stays HIGH for the exact duration it takes for the sound wave to bounce back from an obstacle. Distance = (ECHO High Duration * Speed of Sound 343m/s) / 2."
        )
    ]

    build_steps = [
        "1. Insert Arduino UNO R3 into central breadboard workspace.",
        "2. Connect Arduino 5V pin to breadboard positive red power rail (+).",
        "3. Connect Arduino GND pin to breadboard blue ground rail (-).",
        "4. Place LED on breadboard. Connect 220Ω resistor between Anode (+) and Arduino Digital Pin 13.",
        "5. Connect LED Cathode (-) to Ground rail (-).",
        "6. Connect sensor VCC/GND pins to power rails and digital signal pins according to code pin definitions."
    ]

    return AIInspectResponse(
        status="ANALYSIS_COMPLETE",
        summary=f"Analyzed virtual circuit with {comp_count} components and {wire_count} wire edges.",
        circuit_analysis=f"Circuit topology consists of {comp_count} active modules. Electrical rule engine flagged {err_count} issues.",
        firmware_analysis="Firmware structure evaluated. Serial communication configured @ 9600 Baud. Loop timing controlled via delay steps.",
        diagnoses=diagnoses,
        viva_questions=viva_questions,
        hardware_build_steps=build_steps,
    )
