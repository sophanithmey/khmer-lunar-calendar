import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MoonCanvasFallback } from './moon-canvas-fallback';
import { useReducedMotion } from '../../../hooks/use-reduced-motion';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface MoonSceneProps {
  phaseDegrees: number;
  illuminationPct: number;
  className?: string;
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function MoonScene({ phaseDegrees, illuminationPct, className = '' }: MoonSceneProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // References for drag interaction
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const moonMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!checkWebGLSupport()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 4.3;

    // Ambient space light: subtle deep indigo backlight for earthshine effect
    const ambientLight = new THREE.AmbientLight(0x0e1c33, 0.55);
    scene.add(ambientLight);

    // Directional light representing the Sun
    // 0 deg = New Moon (Sun behind Moon)
    // 90 deg = First Quarter (Sun at right)
    // 180 deg = Full Moon (Sun directly in front)
    // 270 deg = Third Quarter (Sun at left)
    const sunLight = new THREE.DirectionalLight(0xfffdf5, 3.2);
    const rad = (phaseDegrees * Math.PI) / 180;
    sunLight.position.set(Math.sin(rad) * 14, 0, Math.cos(rad) * 14);
    scene.add(sunLight);

    // Secondary subtle rim light for spatial depth
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 0.25);
    rimLight.position.set(-Math.sin(rad) * 10, -5, -8);
    scene.add(rimLight);

    // Load High-Resolution Moon Texture Map
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load(
      '/moon-map.jpg',
      () => {
        renderer.render(scene, camera);
      },
      undefined,
      () => {
        // Fallback texture handling if load fails
      }
    );
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // Moon sphere geometry & material
    const moonGeo = new THREE.SphereGeometry(1.42, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.04,
      roughness: 0.88,
      metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    // Initial orientation facing Earth frontally
    moonMesh.rotation.y = -Math.PI / 2;
    scene.add(moonMesh);
    moonMeshRef.current = moonMesh;

    // Outer subtle celestial atmosphere halo (inverted glow ring)
    const glowGeo = new THREE.SphereGeometry(1.44, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe8bf70,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // Drag Interaction Listeners
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;
      prevPointerRef.current = { x: clientX, y: clientY };
      rotVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !moonMeshRef.current) return;
      const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;

      const deltaX = clientX - prevPointerRef.current.x;
      const deltaY = clientY - prevPointerRef.current.y;

      prevPointerRef.current = { x: clientX, y: clientY };
      rotVelocityRef.current = { x: deltaX * 0.005, y: deltaY * 0.005 };

      moonMeshRef.current.rotation.y += deltaX * 0.008;
      moonMeshRef.current.rotation.x += deltaY * 0.008;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = 'grab';
    domElem.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElem.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation render loop
    let animId: number;
    const animate = () => {
      if (!isDraggingRef.current && moonMeshRef.current) {
        // Inertia damping
        if (Math.abs(rotVelocityRef.current.x) > 0.0001) {
          moonMeshRef.current.rotation.y += rotVelocityRef.current.x;
          rotVelocityRef.current.x *= 0.94;
        }
        if (Math.abs(rotVelocityRef.current.y) > 0.0001) {
          moonMeshRef.current.rotation.x += rotVelocityRef.current.y;
          rotVelocityRef.current.y *= 0.94;
        }

        // Gentle ambient auto-rotation
        if (!reducedMotion && isRotating && Math.abs(rotVelocityRef.current.x) < 0.001) {
          moonMeshRef.current.rotation.y += 0.0015;
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElem.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      moonTexture.dispose();
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, [phaseDegrees, reducedMotion, isRotating]);

  const handleResetRotation = () => {
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.set(0, -Math.PI / 2, 0);
      rotVelocityRef.current = { x: 0, y: 0 };
    }
  };

  if (!hasWebGL) {
    return (
      <MoonCanvasFallback
        phaseDegrees={phaseDegrees}
        illuminationPct={illuminationPct}
        className={className}
      />
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full max-w-[360px] sm:max-w-[420px] aspect-square flex items-center justify-center select-none"
      />

      {/* Interactive Controls Overlay */}
      <div className="flex items-center gap-2 mt-2 z-10">
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930]/80 hover:bg-[#142A4D] border border-white/10 text-xs font-medium text-[#A9B8CC] hover:text-[#E8BF70] transition-colors cursor-pointer shadow-sm"
        >
          {isRotating ? (
            <Pause className="w-3 h-3 text-[#E8BF70]" />
          ) : (
            <Play className="w-3 h-3 text-[#E8BF70]" />
          )}
          <span>{isRotating ? 'ផ្អាកបង្វិល' : 'បង្វិលស្វ័យប្រវត្តិ'}</span>
        </button>

        <button
          type="button"
          onClick={handleResetRotation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1930]/80 hover:bg-[#142A4D] border border-white/10 text-xs font-medium text-[#A9B8CC] hover:text-[#E8BF70] transition-colors cursor-pointer shadow-sm"
          title="កំណត់ទីតាំងដើម"
        >
          <RotateCcw className="w-3 h-3" />
          <span>កំណត់ដើម</span>
        </button>
      </div>
    </div>
  );
}
