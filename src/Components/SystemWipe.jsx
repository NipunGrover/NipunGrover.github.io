import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./SystemWipe.css";

// Easter egg: `sudo rm -rf /*` in the hero console fires "site:wipe".
// Every section tumbles off the page, a dead terminal is left behind,
// and after 3 seconds a reset button flies everything back. Nothing is actually removed.
export const WIPE_EVENT = "site:wipe";
const RESET_DELAY_MS = 3000;
const TARGETS = "nav.navbar, section, footer";

export const SystemWipe = () => {
    const [phase, setPhase] = useState("idle"); // idle | falling | wiped | restoring
    const [showReset, setShowReset] = useState(false);
    const tlRef = useRef(null);
    const resetRef = useRef(null);

    useEffect(() => {
        const wipe = () => {
            if (tlRef.current) return; // already wiped
            const targets = gsap.utils.toArray(TARGETS);
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            window.scrollTo({ top: 0, behavior: "instant" });
            document.body.style.overflow = "hidden";
            setPhase("falling");

            const tl = gsap.timeline({
                onComplete: () => {
                    setPhase("wiped");
                    setTimeout(() => setShowReset(true), RESET_DELAY_MS);
                },
                onReverseComplete: () => {
                    gsap.set(targets, { clearProps: "transform,opacity" });
                    document.body.style.overflow = "";
                    tlRef.current = null;
                    setPhase("idle");
                },
            });

            if (reduced) {
                tl.to(targets, { opacity: 0, duration: 0.3 });
            } else {
                tl.to(targets, { x: "random(-10, 10)", duration: 0.05, repeat: 9, yoyo: true, ease: "none" })
                    .set(targets, { x: 0 })
                    .to(targets, {
                        y: () => window.innerHeight + gsap.utils.random(150, 500),
                        rotation: "random(-28, 28)",
                        duration: 1.1,
                        ease: "power2.in",
                        stagger: { each: 0.09, from: "random" },
                    });
            }
            tlRef.current = tl;
        };

        window.addEventListener(WIPE_EVENT, wipe);
        return () => window.removeEventListener(WIPE_EVENT, wipe);
    }, []);

    useEffect(() => {
        if (showReset) resetRef.current?.focus();
    }, [showReset]);

    const restore = () => {
        setShowReset(false);
        setPhase("restoring");
        tlRef.current?.timeScale(1.8).reverse();
    };

    if (phase !== "wiped") return null;

    return (
        <div className="wipe-screen" role="alert">
            <div className="wipe-terminal">
                <p>rm: removed &apos;/&apos; and everything under it</p>
                <p>bash: react: command not found</p>
                <p>bash: portfolio: No such file or directory</p>
                <p className="wipe-prompt">
                    nipun@portfolio:/# <span className="wipe-cursor" aria-hidden="true" />
                </p>
            </div>
            {showReset && (
                <button type="button" ref={resetRef} className="wipe-reset" onClick={restore}>
                    ↺ Restore site
                </button>
            )}
        </div>
    );
};
