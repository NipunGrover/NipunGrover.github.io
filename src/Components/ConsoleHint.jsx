import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ConsoleHint = ({ isOpen, onOpen }) => {
    const hintRef = useRef(null);

    useEffect(() => {
        // If console is open, hide hint immediately
        if (isOpen) {
            if (hintRef.current) {
                gsap.killTweensOf(hintRef.current);
                gsap.set(hintRef.current, { opacity: 0, pointerEvents: "none" });
            }
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(hintRef.current,
                {
                    x: 50,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 3,
                    ease: "back.out(1.7)",
                    pointerEvents: "auto"
                }
            );
        }, hintRef);

        return () => ctx.revert();
    }, [isOpen]);

    return (
        <>
            <style>
                {`
                    .console-hint-container {
                        position: absolute;
                        right: 30px;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 10;
                    }
                    @media (max-width: 768px) {
                        .console-hint-container {
                            top: auto !important;
                            bottom: 100px !important; /* Move to bottom on mobile */
                            transform: none !important;
                            right: 20px !important;
                        }
                    }
                `}
            </style>
            <div
                ref={hintRef}
                onClick={onOpen}
                className="console-hint console-hint-container"
                style={{
                    // Multi-tone background simulating the image
                    background: "linear-gradient(90deg, #2c3e50 0%, #2c3e50 40%, #34495e 40%, #34495e 100%)",
                    borderLeft: "3px solid #5d6d7e",
                    color: "#ecf0f1",
                    padding: "8px 16px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "'Courier New', Courier, monospace",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                    opacity: 0,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "auto"
                }}
            >
                <span style={{ fontSize: "12px", fontWeight: "500", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                    tip: click on the console
                </span>

                {/* Geometric triangle accent (bottom right) */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "0",
                    height: "0",
                    borderStyle: "solid",
                    borderWidth: "0 0 10px 10px",
                    borderColor: "transparent transparent #212f3d transparent",
                    opacity: 0.5
                }} />
            </div>
        </>
    );
};
