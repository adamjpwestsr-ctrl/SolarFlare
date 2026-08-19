"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Planet() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ff8c00"),
      emissive: new THREE.Color("#ff6a00"),
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.PointLight("#ffffff", 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    function animate() {
      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => mount.removeChild(renderer.domElement);
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-32 right-20 w-[300px] h-[300px] -z-20"
    />
  );
}
