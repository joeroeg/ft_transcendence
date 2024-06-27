import * as THREE from 'three';

const envMap = new THREE.CubeTextureLoader().load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

export function initGeometry(g) {
    initializeFloor(g);
    initializePaddles(g);
    g.bulbLight.position.set(0, 0.2, 0);
}

function initializeFloor(g) {
    const floorMaterial = g.floorMat;
    const floorMesh = createFloorMesh(floorMaterial);
    g.floorMesh = floorMesh;
    g.scene.add(floorMesh);
}

function initializePaddles(g) {
    const paddleMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0x00ff00,
        emissiveIntensity: 0.9,
        envMap: envMap,
        reflectivity: 0.5,
    });

    const aiPaddleMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.8,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0xff0000,
        emissiveIntensity: 0.9,
        envMap: envMap,
        reflectivity: 0.5,
    });

    const paddleMesh = createPaddleMesh(paddleMaterial, 8);
    g.paddleMesh = paddleMesh;
    g.scene.add(paddleMesh);

    const aiPaddleMesh = createPaddleMesh(aiPaddleMaterial, -8);
    g.aiPaddleMesh = aiPaddleMesh;
    g.scene.add(aiPaddleMesh);
}


function createFloorMesh(floorMat) {
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    return floorMesh;
}

function createPaddleMesh(material, zPosition) {
    const paddleWidth = 1.5;
    const paddleHeight = 1.1;
    const paddleDepth = 0.3;
    const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
    const paddleMesh = new THREE.Mesh(paddleGeometry, material);
    paddleMesh.position.set(0, paddleHeight / 2, zPosition);
    paddleMesh.castShadow = true;
    return paddleMesh;
}
