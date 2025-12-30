import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Environment, OrbitControls } from "@react-three/drei";
import donutUrl from "../assets/3d/donut.glb";
import donutWinterUrl from "../assets/3d/donut-winter.glb";
import { useTheme, THEMES } from "../ThemeContext";

function Model({ url, ...props }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene.clone()} {...props} />;
}

export const Donut = () => {
  const [scale, setScale] = useState(4.08);
  const [positionY, setPositionY] = useState(-1.7);
  const [isMobile, setIsMobile] = useState(false);
  const interactionRegionRef = useRef(null);
  const [interactionDomElement, setInteractionDomElement] = useState(null);
  const { theme } = useTheme();

  const isWinter = theme === THEMES.winter;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 850);

      // Fluid scaling based on viewport width
      // Scale linearly from 2.0 at 320px to 4.08 at 1920px, capped at 4.08
      const minWidth = 320;
      const maxWidth = 1920;
      const minScale = 2.0;
      const maxScale = 4.08;

      const clampedWidth = Math.min(Math.max(width, minWidth), maxWidth);
      const ratio = (clampedWidth - minWidth) / (maxWidth - minWidth);
      const newScale = minScale + ratio * (maxScale - minScale);
      setScale(newScale);

      // Fluid Y position: from -0.3 at small screens to -1.7 at large
      const minPosY = -0.3;
      const maxPosY = -1.7;
      const newPosY = minPosY + ratio * (maxPosY - minPosY);
      setPositionY(newPosY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setInteractionDomElement(null);
      return;
    }
    setInteractionDomElement(interactionRegionRef.current);
  }, [isMobile]);

  // On mobile: container is small but canvas overflows visually
  // On desktop: container is full size
  const containerStyle = isMobile
    ? {
      position: "absolute",
      top: "25%",
      left: "10%",
      width: "80%",
      height: "50%",
      zIndex: 10,
    }
    : {
      width: "100%",
      height: "100%",
    };

  // On mobile, make the canvas larger than container and center it
  const canvasContainerStyle = isMobile
    ? {
      width: "250%",
      height: "200%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    }
    : {
      width: "100%",
      height: "100%",
    };

  // Lighting configuration - winter is less warm, more neutral
  const lightingConfig = isWinter
    ? {
      ambient: { intensity: 0.45, color: "#E8E8E8" },
      directional: { color: "#D4B896", intensity: 1.0 },
      spot: { color: "#C9A86C", intensity: 0.7 },
      point1: { color: "#B8956A", intensity: 18 },
      point2: { color: "#A07840", intensity: 12 },
      environment: "sunset",
    }
    : {
      ambient: { intensity: 0.4, color: "#FFDAB9" },
      directional: { color: "#FF8C42", intensity: 1.2 },
      spot: { color: "#FF7043", intensity: 0.8 },
      point1: { color: "#FF6B35", intensity: 25 },
      point2: { color: "#E65100", intensity: 15 },
      environment: "sunset",
    };

  return (
    <div style={containerStyle}>
      <div style={canvasContainerStyle}>
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 60 }}
          style={{
            pointerEvents: isMobile ? "none" : "auto",
            touchAction: isMobile ? "auto" : "none",
          }}
        >
          <ambientLight
            intensity={lightingConfig.ambient.intensity}
            color={lightingConfig.ambient.color}
          />
          <directionalLight
            position={[0, 2, 6]}
            intensity={lightingConfig.directional.intensity}
            color={lightingConfig.directional.color}
          />
          <spotLight
            position={[5, 3, 5]}
            angle={0.4}
            penumbra={1}
            intensity={lightingConfig.spot.intensity}
            color={lightingConfig.spot.color}
          />
          <pointLight
            position={[0, -3, -5]}
            color={lightingConfig.point1.color}
            intensity={lightingConfig.point1.intensity}
          />
          <pointLight
            position={[3, -4, -4]}
            color={lightingConfig.point2.color}
            intensity={lightingConfig.point2.intensity}
          />

          <Suspense fallback={null}>
            <Float speed={2.6} rotationIntensity={0} floatIntensity={0.9}>
              <Model
                url={isWinter ? donutWinterUrl : donutUrl}
                scale={scale}
                position={[0, positionY, 0]}
                rotation={[0.2, Math.PI, 0]}
              />
            </Float>
            <Environment preset={lightingConfig.environment} environmentIntensity={0.4} />
          </Suspense>

          {!isMobile && (
            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.08}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          )}
          {isMobile && interactionDomElement && (
            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.08}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              domElement={interactionDomElement}
            />
          )}
        </Canvas>
      </div>
      {isMobile && (
        <div
          ref={interactionRegionRef}
          className="donut-interaction-region"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "auto",
            background: "transparent",
          }}
        />
      )}
    </div>
  );
};

