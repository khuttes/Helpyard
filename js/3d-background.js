// 3D Background with Three.js
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometries = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };

        this.init();
        this.createGeometries();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '-2';
        this.renderer.domElement.style.opacity = '0.3';
        this.renderer.domElement.id = '3d-canvas';

        document.body.appendChild(this.renderer.domElement);
    }

    createGeometries() {
        const geometryTypes = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.DodecahedronGeometry(1, 0)
        ];

        const colors = [0x38bdf8, 0xec4899, 0x34d399, 0xa78bfa];

        // Create 6 floating geometries
        for (let i = 0; i < 6; i++) {
            const geometry = geometryTypes[i % geometryTypes.length];
            const material = new THREE.MeshBasicMaterial({
                color: colors[i % colors.length],
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 5;

            // Random rotation speed
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };

            // Random scale
            const scale = 0.5 + Math.random() * 1;
            mesh.scale.set(scale, scale, scale);

            this.scene.add(mesh);
            this.geometries.push(mesh);
        }
    }

    setupEventListeners() {
        // Mouse move for parallax
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth mouse following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Update camera position based on mouse (parallax effect)
        this.camera.position.x = this.mouse.x * 0.5;
        this.camera.position.y = this.mouse.y * 0.5;
        this.camera.lookAt(this.scene.position);

        // Rotate geometries
        this.geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D background when DOM and Three.js are ready
function init3DBackground() {
    if (typeof THREE !== 'undefined') {
        new ThreeBackground();
    } else {
        console.warn('Three.js not loaded. 3D background disabled.');
    }
}

// Wait for Three.js to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(init3DBackground, 100);
    });
} else {
    setTimeout(init3DBackground, 100);
}
