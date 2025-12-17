import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei';
import donutUrl from '../assets/3d/donut.glb';

function Model(props) {
    const gltf = useGLTF(donutUrl);
    return <primitive object={gltf.scene} {...props} />
}

export const Donut = () => {
    const [scale, setScale] = useState(4.08);
    const [positionY, setPositionY] = useState(-1.70);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Scale donut based on screen width
            // Desktop (1920px+): 4.08, scales down proportionally for smaller screens
            if (width >= 1920) {
                setScale(4.08);
                setPositionY(-1.70);
            } else if (width >= 1200) {
                // Laptops / smaller desktops
                setScale(3.8);
                setPositionY(-1.5);
            } else if (width >= 992) {
                // Tablets landscape
                setScale(3.2);
                setPositionY(-1.2);
            } else if (width >= 768) {
                // iPad Air / tablets portrait
                setScale(2.8);
                setPositionY(-0.8);
            } else if (width >= 576) {
                // Large phones
                setScale(2.4);
                setPositionY(-0.5);
            } else {
                // Small phones
                setScale(2.0);
                setPositionY(-0.3);
            }
        };

        // Initial call
        handleResize();

        // Listen for resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 6.5], fov: 60 }}>
                {/* Subtle warm ambient */}
                <ambientLight intensity={0.4} color="#FFDAB9" />
                {/* Main front key light - soft orange tone */}
                <directionalLight position={[0, 2, 6]} intensity={1.2} color="#FF8C42" />
                {/* Warm fill light from side */}
                <spotLight position={[5, 3, 5]} angle={0.4} penumbra={1} intensity={0.8} color="#FF7043" />
                {/* Subtle orange backlight for rim - NOT overblown */}
                <pointLight
                    position={[0, -3, -5]}
                    color="#FF6B35"
                    intensity={25}
                />
                {/* Secondary rim from bottom-right */}
                <pointLight
                    position={[3, -4, -4]}
                    color="#E65100"
                    intensity={15}
                />
                <Suspense fallback={null}>
                    <Float speed={2.6} rotationIntensity={0} floatIntensity={0.9}>
                        <Model scale={scale} position={[0, positionY, 0]} rotation={[0.2, Math.PI, 0]} />
                    </Float>
                    {/* Sunset environment - reduced intensity */}
                    <Environment preset="sunset" environmentIntensity={0.4} />
                </Suspense>
                <OrbitControls
                    makeDefault
                    enableDamping
                    dampingFactor={0.08}
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    )
}
