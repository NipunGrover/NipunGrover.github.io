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
                    x: 16,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 3,
                    ease: "power3.out",
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
                    /* Terminal-style chip that matches the boot text it points at */
                    .console-hint {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 14px;
                        border: 1px solid color-mix(in srgb, var(--accent-primary) 35%, transparent);
                        border-radius: 6px;
                        background: rgba(10, 10, 10, 0.55);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        color: #d8d8d8;
                        font-family: "Courier New", Courier, monospace;
                        font-size: 12px;
                        letter-spacing: 0.5px;
                        white-space: nowrap;
                        cursor: pointer;
                        opacity: 0;
                        pointer-events: none;
                        transition: border-color 0.2s, color 0.2s;
                    }
                    .console-hint:hover,
                    .console-hint:focus-visible {
                        border-color: var(--accent-primary);
                        color: #fff;
                        outline: none;
                    }
                    .console-hint-prompt { color: var(--accent-primary); }
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
            {/* div, not button: the banner's global button styles would override this chip */}
            <div
                ref={hintRef}
                onClick={onOpen}
                onKeyDown={(e) => e.key === "Enter" && onOpen()}
                role="button"
                tabIndex={0}
                className="console-hint console-hint-container"
            >
                <span className="console-hint-prompt" aria-hidden="true">&gt;</span>
                tip: click the console
            </div>
        </>
    );
};
