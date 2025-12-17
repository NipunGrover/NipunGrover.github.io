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
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <Suspense fallback={null}>
                    <Float speed={2.6} rotationIntensity={0} floatIntensity={0.9}>
                        <Model scale={3.4} rotation={[0.2, Math.PI / 2, 0]} />
                    </Float>
                    <Environment preset="city" />
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
