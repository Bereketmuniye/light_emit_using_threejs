// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: soft shadows
document.body.appendChild(renderer.domElement);

// Add a basic shape (Torus Knot)
const radius = 1;
const tube = 0.4;
const radialSegments = 16;
const tubularSegments = 100;
const geometry = new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments);
const materialOn = new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0xffa500, emissiveIntensity: 5 });
const materialOff = new THREE.MeshStandardMaterial({ color: 0x444444, emissive: 0x000000 });
const torusKnot = new THREE.Mesh(geometry, materialOff);
torusKnot.castShadow = true; // Enable casting shadow
scene.add(torusKnot);

// Create a ground plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5 }); // Gray color with some roughness
const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
groundPlane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
groundPlane.receiveShadow = true; // Enable receiving shadow
scene.add(groundPlane);

// Create a Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 5, 0);
directionalLight.castShadow = true; // Enable shadow casting
scene.add(directionalLight);

// Add an Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add a Point Light (Battery effect)
const pointLight = new THREE.PointLight(0xffa500, 2, 10); // Orange light
pointLight.position.set(0, 1, 0); // Position it close to the torus knot
pointLight.castShadow = true; // Enable shadow casting
scene.add(pointLight);

// Optional: Add helpers to visualize the lights
const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(lightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

// Toggle variable
let isOn = false;

// Function to toggle the light
function toggleLight() {
    isOn = !isOn; // Toggle state
    if (isOn) {
        torusKnot.material = materialOn; // Change material to "on"
        pointLight.visible = true; // Turn on point light
    } else {
        torusKnot.material = materialOff; // Change material to "off"
        pointLight.visible = false; // Turn off point light
    }
}

// Add event listener for mouse click
window.addEventListener('click', toggleLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();