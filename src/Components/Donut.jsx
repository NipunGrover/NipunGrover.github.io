import React, { Suspense, useState, useEffect, useRef } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    const interactionRegionRef = useRef(null);
    const [interactionDomElement, setInteractionDomElement] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 850);

            if (width >= 1920) {
                setScale(4.08);
                setPositionY(-1.70);
            } else if (width >= 1200) {
                setScale(3.8);
                setPositionY(-1.5);
            } else if (width >= 992) {
                setScale(3.2);
                setPositionY(-1.2);
            } else if (width >= 768) {
                setScale(2.8);
                setPositionY(-0.8);
            } else if (width >= 576) {
                setScale(2.4);
                setPositionY(-0.5);
            } else {
                setScale(2.0);
                setPositionY(-0.3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
    const containerStyle = isMobile ? {
        position: 'absolute',
        top: '25%',
        left: '10%',
        width: '80%',
        height: '50%',
        zIndex: 10,
    } : {
        width: '100%',
        height: '100%',
    };

    // On mobile, make the canvas larger than container and center it
    const canvasContainerStyle = isMobile ? {
        width: '250%',
        height: '200%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
    } : {
        width: '100%',
        height: '100%',
    };

    return (
        <div style={containerStyle}>
            <div style={canvasContainerStyle}>
                <Canvas
                    camera={{ position: [0, 0, 6.5], fov: 60 }}
                    style={{
                        pointerEvents: isMobile ? 'none' : 'auto',
                        touchAction: isMobile ? 'auto' : 'none',
                    }}
                >
                    <ambientLight intensity={0.4} color="#FFDAB9" />
                    <directionalLight position={[0, 2, 6]} intensity={1.2} color="#FF8C42" />
                    <spotLight position={[5, 3, 5]} angle={0.4} penumbra={1} intensity={0.8} color="#FF7043" />
                    <pointLight position={[0, -3, -5]} color="#FF6B35" intensity={25} />
                    <pointLight position={[3, -4, -4]} color="#E65100" intensity={15} />

                    <Suspense fallback={null}>
                        <Float speed={2.6} rotationIntensity={0} floatIntensity={0.9}>
                            <Model scale={scale} position={[0, positionY, 0]} rotation={[0.2, Math.PI, 0]} />
                        </Float>
                        <Environment preset="sunset" environmentIntensity={0.4} />
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
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        pointerEvents: 'auto',
                        background: 'transparent',
                    }}
                />
            )}
        </div>
    )
}
