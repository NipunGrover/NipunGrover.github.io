import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, OrbitControls } from '@react-three/drei';
import donutUrl from '../assets/3d/donut.glb';

function Model(props) {
    const gltf = useGLTF(donutUrl);
    return <primitive object={gltf.scene} {...props} />
}

export const Donut = () => {
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
                        <Model scale={5.1} position={[0, -1.85, 0]} rotation={[0.2, Math.PI, 0]} />
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
