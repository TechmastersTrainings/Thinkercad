import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useCircuitStore } from '../../store/useCircuitStore';
import { useSimulationStore } from '../../store/useSimulationStore';

export const CircuitCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { components, wires, selectedWireColor, selectComponent, selectedComponentId } = useCircuitStore();
  const simulationStatus = useSimulationStore((state) => state.status);
  const isSimulating = simulationStatus === 'RUNNING';

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#E6E9ED'); // Authentic Tinkercad Light Canvas

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 9, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. 3D OrbitControls (Left-drag: Orbit, Right-drag: Pan, Scroll: Zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.1);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.5);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // 4. 3D Workbench Floor Grid (Tinkercad Dot Grid Style)
    const gridHelper = new THREE.GridHelper(50, 50, 0xBDC5CC, 0xCFD4D9);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Workbench Table Mesh
    const tableGeo = new THREE.PlaneGeometry(60, 60);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0xEBF0F5,
      roughness: 0.9,
      metalness: 0.05,
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.position.y = -0.01;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // Store component 3D positions for wire routing & selection
    const comp3DPositions: Map<string, THREE.Vector3> = new Map();
    const meshToCompId: Map<THREE.Object3D, string> = new Map();

    // 5. Render 3D Extruded Boards & Components
    components.forEach((comp, idx) => {
      const isBoard = comp.typeId.startsWith('board-');
      const posX = (comp.position.x * 0.025) || (idx % 3) * 4 - 4;
      const posZ = (comp.position.y * 0.025) || Math.floor(idx / 3) * 4 - 2;

      comp3DPositions.set(comp.id, new THREE.Vector3(posX, 0.3, posZ));

      const compGroup = new THREE.Group();
      compGroup.position.set(posX, 0, posZ);

      // Selected component highlight ring
      const isSelected = selectedComponentId === comp.id;

      // --- 3D Boards ---
      if (isBoard) {
        let pcbColor = 0x00A859; // Authentic Arduino Green/Teal
        if (comp.typeId === 'board-esp32-devkit') pcbColor = 0x222222;
        if (comp.typeId === 'board-raspberry-pi-pico') pcbColor = 0x00E676;
        if (comp.typeId === 'board-stm32-nucleo') pcbColor = 0x334155;

        // 3D Extruded PCB Body
        const pcbGeo = new THREE.BoxGeometry(3.6, 0.15, 2.6);
        const pcbMat = new THREE.MeshStandardMaterial({
          color: isSelected ? 0x2979FF : pcbColor,
          roughness: 0.3,
          metalness: 0.2,
        });
        const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
        pcbMesh.position.y = 0.075;
        pcbMesh.castShadow = true;
        pcbMesh.receiveShadow = true;
        compGroup.add(pcbMesh);
        meshToCompId.set(pcbMesh, comp.id);

        // USB Connector
        const usbGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
        const usbMat = new THREE.MeshStandardMaterial({ color: 0xD1D5DB, metalness: 0.9, roughness: 0.1 });
        const usbMesh = new THREE.Mesh(usbGeo, usbMat);
        usbMesh.position.set(-1.4, 0.3, -0.8);
        compGroup.add(usbMesh);

        // Chip Block
        const chipGeo = new THREE.BoxGeometry(1.6, 0.18, 0.5);
        const chipMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.6 });
        const chipMesh = new THREE.Mesh(chipGeo, chipMat);
        chipMesh.position.set(0.2, 0.24, 0.1);
        compGroup.add(chipMesh);

        // Header Rails
        const headerGeo = new THREE.BoxGeometry(2.4, 0.22, 0.18);
        const headerMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
        const headerTop = new THREE.Mesh(headerGeo, headerMat);
        headerTop.position.set(0.2, 0.26, -1.15);
        compGroup.add(headerTop);

        const headerBottom = new THREE.Mesh(headerGeo, headerMat);
        headerBottom.position.set(0.2, 0.26, 1.15);
        compGroup.add(headerBottom);

        if (isSimulating) {
          const ledLight = new THREE.PointLight(0x00E676, 3, 3);
          ledLight.position.set(0.8, 0.5, -0.6);
          compGroup.add(ledLight);
        }
      }

      // --- 3D Components ---
      if (!isBoard) {
        if (comp.typeId === 'led' || comp.typeId === 'rgb-led') {
          const ledColor = isSimulating ? (comp.typeId === 'led' ? 0xFF1744 : 0x00E676) : 0x64748B;
          const domeGeo = new THREE.SphereGeometry(0.35, 32, 16);
          const domeMat = new THREE.MeshPhysicalMaterial({
            color: isSelected ? 0x2979FF : ledColor,
            roughness: 0.1,
            transmission: 0.7,
            thickness: 0.5,
          });
          const domeMesh = new THREE.Mesh(domeGeo, domeMat);
          domeMesh.position.y = 0.45;
          domeMesh.castShadow = true;
          compGroup.add(domeMesh);
          meshToCompId.set(domeMesh, comp.id);

          if (isSimulating) {
            const pointLight = new THREE.PointLight(ledColor, 5, 4);
            pointLight.position.y = 0.5;
            compGroup.add(pointLight);
          }
        } else if (comp.typeId === 'ultrasonic-hcsr04') {
          const pcbGeo = new THREE.BoxGeometry(2.4, 0.1, 1.2);
          const pcbMat = new THREE.MeshStandardMaterial({ color: isSelected ? 0x2979FF : 0x0284C7 });
          const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
          pcbMesh.position.y = 0.08;
          compGroup.add(pcbMesh);
          meshToCompId.set(pcbMesh, comp.id);
        } else if (comp.typeId === 'servo') {
          const bodyGeo = new THREE.BoxGeometry(1.2, 1.0, 0.7);
          const bodyMat = new THREE.MeshStandardMaterial({ color: isSelected ? 0x2979FF : 0x0284C7 });
          const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
          bodyMesh.position.y = 0.6;
          compGroup.add(bodyMesh);
          meshToCompId.set(bodyMesh, comp.id);
        } else {
          const boxGeo = new THREE.BoxGeometry(1.4, 0.4, 1.4);
          const boxMat = new THREE.MeshStandardMaterial({ color: isSelected ? 0x2979FF : 0x475569 });
          const boxMesh = new THREE.Mesh(boxGeo, boxMat);
          boxMesh.position.y = 0.2;
          compGroup.add(boxMesh);
          meshToCompId.set(boxMesh, comp.id);
        }
      }

      scene.add(compGroup);
    });

    // 6. Render 3D Tinkercad Wires
    wires.forEach((wire) => {
      const fromPos = comp3DPositions.get(wire.fromComponentId);
      const toPos = comp3DPositions.get(wire.toComponentId);
      if (!fromPos || !toPos) return;

      const start = fromPos.clone();
      const end = toPos.clone();
      const mid = new THREE.Vector3((start.x + end.x) / 2, Math.max(start.y, end.y) + 1.2, (start.z + end.z) / 2);

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: wire.color || selectedWireColor || 0xFF0000,
        roughness: 0.3,
        metalness: 0.2,
      });

      const wireMesh = new THREE.Mesh(tubeGeo, tubeMat);
      wireMesh.castShadow = true;
      scene.add(wireMesh);
    });

    // Raycaster for clicking 3D components
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(meshToCompId.keys()));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const compId = meshToCompId.get(hitMesh);
        if (compId) selectComponent(compId);
      } else {
        // Unselect if background clicked
        selectComponent(null);
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 7. Animation Frame Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [components, wires, isSimulating, selectedWireColor, selectedComponentId, selectComponent]);

  return (
    <div className="relative flex-1 h-full bg-[#E6E9ED] overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
