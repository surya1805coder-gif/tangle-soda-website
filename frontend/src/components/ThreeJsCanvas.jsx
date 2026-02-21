import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FLAVOR_CONFIGS = {
    Orange: {
        primary: 0xFF4500,
        secondary: 0xFF8C00,
        lightning: 0xFF6500,
        particles: 0xFFA500,
    },
    'Green Apple': {
        primary: 0x22CC44,
        secondary: 0x00AA33,
        lightning: 0x00FFCC,
        particles: 0x00FF88,
    },
    Lemon: {
        primary: 0xFFDD00,
        secondary: 0xFFAA00,
        lightning: 0xFFFF99,
        particles: 0xFFEE44,
    },
};

function createCanGeometry(scene, config) {
    const group = new THREE.Group();

    // CAN BODY
    const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 2, 48, 1);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: config.primary,
        metalness: 0.85,
        roughness: 0.12,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    // CAN TOP
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.08 });
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 0.18, 48), metalMat);
    top.position.y = 1.09;
    group.add(top);

    // CAN BOTTOM
    const bot = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 0.12, 48), metalMat.clone());
    bot.position.y = -1.06;
    group.add(bot);

    // PULL TAB
    const tabGeo = new THREE.TorusGeometry(0.1, 0.025, 8, 16, Math.PI * 1.5);
    const tabMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.1 });
    const tab = new THREE.Mesh(tabGeo, tabMat);
    tab.position.set(0.15, 1.22, 0);
    tab.rotation.x = Math.PI / 2;
    group.add(tab);

    // LABEL BAND
    const labelMat = new THREE.MeshStandardMaterial({
        color: config.secondary,
        metalness: 0.4, roughness: 0.4,
        transparent: true, opacity: 0.85, side: THREE.FrontSide,
    });
    const label = new THREE.Mesh(new THREE.CylinderGeometry(0.552, 0.552, 1.6, 48, 1, true), labelMat);
    label.position.y = -0.1;
    group.add(label);

    // WHITE STRIPE
    const stripeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, metalness: 0.1, roughness: 0.8, transparent: true, opacity: 0.6,
    });
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.555, 0.555, 0.12, 48, 1, true), stripeMat);
    stripe.position.y = -0.6;
    group.add(stripe);

    scene.add(group);
    return group;
}

function createLightning(scene, config) {
    const bolts = [];
    for (let i = 0; i < 6; i++) {
        const points = [];
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.2 + Math.random() * 0.5;
        let x = Math.cos(angle) * 0.6;
        let y = 0.8 - i * 0.2;
        let z = Math.sin(angle) * 0.6;
        points.push(new THREE.Vector3(x, y, z));
        for (let j = 0; j < 5; j++) {
            x = Math.cos(angle) * (0.6 + (j / 4) * (radius - 0.6)) + (Math.random() - 0.5) * 0.4;
            y += (Math.random() - 0.5) * 0.5;
            z = Math.sin(angle) * (0.6 + (j / 4) * (radius - 0.6)) + (Math.random() - 0.5) * 0.4;
            points.push(new THREE.Vector3(x, y, z));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: config.lightning, transparent: true, opacity: 0.8 });
        const bolt = new THREE.Line(geo, mat);
        scene.add(bolt);
        bolts.push({ bolt, baseOpacity: 0.6 + Math.random() * 0.4 });
    }
    return bolts;
}

function createParticles(scene, config) {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = 0.8 + Math.random() * 1.8;
        positions[i * 3 + 0] = Math.cos(theta) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
        positions[i * 3 + 2] = Math.sin(theta) * r;
        velocities.push({
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.3) * 0.008,
            z: (Math.random() - 0.5) * 0.005,
            speed: 0.003 + Math.random() * 0.006,
        });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
        color: config.particles, size: 0.04, transparent: true, opacity: 0.85,
        sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);
    return { particles, velocities };
}

export default function ThreeJsCanvas({ flavor = 'Orange', interactive = false, style = {} }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        const config = FLAVOR_CONFIGS[flavor] || FLAVOR_CONFIGS['Orange'];
        const W = mount.clientWidth;
        const H = mount.clientHeight;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mount.appendChild(renderer.domElement);

        // Scene + Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.set(0, 0.5, 5);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const keyLight = new THREE.PointLight(0xffffff, 2.5, 20);
        keyLight.position.set(3, 4, 4);
        scene.add(keyLight);
        const fillLight = new THREE.PointLight(config.primary, 2.0, 15);
        fillLight.position.set(-3, 0, 2);
        scene.add(fillLight);
        const rimLight = new THREE.PointLight(0xffffff, 1.5, 12);
        rimLight.position.set(0, -3, -3);
        scene.add(rimLight);
        const topLight = new THREE.PointLight(config.lightning, 1.5, 10);
        topLight.position.set(0, 4, 0);
        scene.add(topLight);

        // Objects
        const canGroup = createCanGeometry(scene, config);
        const bolts = createLightning(scene, config);
        const { particles, velocities } = createParticles(scene, config);

        // Glow ring on ground
        const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.8, 1.6, 48),
            new THREE.MeshBasicMaterial({
                color: config.primary, transparent: true, opacity: 0.12,
                side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
            })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -1.5;
        scene.add(ring);

        // Mouse interaction
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e) => {
            if (!interactive) return;
            const rect = mount.getBoundingClientRect();
            mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
            mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
        };
        if (interactive) mount.addEventListener('mousemove', handleMouseMove);

        // Resize
        const handleResize = () => {
            const w = mount.clientWidth, h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation
        let frameId;
        let time = 0;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.01;

            canGroup.rotation.y += 0.008;
            canGroup.position.y = Math.sin(time * 0.7) * 0.12;

            if (interactive) {
                mouse.x += (mouse.targetX - mouse.x) * 0.05;
                mouse.y += (mouse.targetY - mouse.y) * 0.05;
                canGroup.rotation.x = mouse.y;
            }

            bolts.forEach(({ bolt, baseOpacity }, i) => {
                bolt.material.opacity = baseOpacity * (0.5 + 0.5 * Math.sin(time * 8 + i * 1.2));
            });

            const posArr = particles.geometry.attributes.position.array;
            velocities.forEach((v, i) => {
                posArr[i * 3 + 0] += v.x;
                posArr[i * 3 + 1] += v.y;
                posArr[i * 3 + 2] += v.z;
                if (Math.abs(posArr[i * 3 + 0]) > 2.5 || posArr[i * 3 + 1] > 2.5 || Math.abs(posArr[i * 3 + 2]) > 2.5) {
                    const theta = Math.random() * Math.PI * 2;
                    posArr[i * 3 + 0] = Math.cos(theta) * 0.7;
                    posArr[i * 3 + 1] = -1 + Math.random() * 0.5;
                    posArr[i * 3 + 2] = Math.sin(theta) * 0.7;
                }
            });
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y += 0.002;

            ring.material.opacity = 0.06 + 0.08 * Math.sin(time * 2);
            fillLight.intensity = 1.5 + Math.sin(time * 3) * 0.5;
            topLight.intensity = 1.0 + Math.sin(time * 5 + 1) * 0.5;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (interactive) mount.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, [flavor, interactive]);

    return (
        <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: interactive ? 'grab' : 'default', ...style }} />
    );
}
