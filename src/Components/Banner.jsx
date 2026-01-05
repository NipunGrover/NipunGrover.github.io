import { useState, useEffect } from "react";
import mountainsBg from "../assets/images/hero/hero-bg.svg";
import winterBg from "../assets/images/hero/winter-hero-bg.svg";
import { Donut } from "./Donut";
import { ConsoleModal } from "./ConsoleModal";
import { ConsoleHint } from "./ConsoleHint";
import { useTheme, THEMES } from "../ThemeContext";

export const Banner = () => {
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState("");
    const [hasConsoleOpened, setHasConsoleOpened] = useState(false);
    const { theme } = useTheme();

    const handleOpenConsole = () => {
        setIsConsoleOpen(true);
        setHasConsoleOpened(true);
    };

    // Also mark as opened if it's opened via other means (like keydown)
    useEffect(() => {
        if (isConsoleOpen) {
            setHasConsoleOpened(true);
        }
    }, [isConsoleOpen]);

    useEffect(() => {
        if (isHovered) {
            const targetText = "> Click to initialize";
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex < targetText.length) {
                    setHoverText(targetText.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 20); // Fast typing speed
            return () => clearInterval(interval);
        } else {
            setHoverText("");
        }
    }, [isHovered]);

    const currentBg = theme === THEMES.winter ? winterBg : mountainsBg;

    return (
        <section className="banner" id="home" style={{ position: "relative" }}>
            {/* Background NIPUN Text */}
            <span className="nipun-bg-text" aria-hidden="true">NIPUN</span>

            {/* Mountain Layer */}
            <div className="mountain-layer" style={{ backgroundImage: `url(${currentBg})` }}></div>

            {/* 3D Donut */}
            <div className="banner-donut" aria-hidden="true">
                <Donut />
            </div>

            {/* System Boot Text - Clickable Console Trigger */}
            <div
                className="system-boot-text"
                onClick={handleOpenConsole}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleOpenConsole()}
            >
                {">"} Detecting Full Stack Developer...<br />
                {">"} User [Nipun] active{!isHovered && <span className="cursor">_</span>}<br />
                <span>
                    {hoverText || '\u00A0'}{isHovered && <span className="cursor">_</span>}
                </span>
            </div>

            {/* Console Hint - Only show if console hasn't been opened yet */}
            {!hasConsoleOpened && (
                <ConsoleHint
                    isOpen={isConsoleOpen}
                    onOpen={handleOpenConsole}
                />
            )}

            {/* Console Modal */}
            <ConsoleModal
                isOpen={isConsoleOpen}
                onClose={() => setIsConsoleOpen(false)}
            />

            {/* Scroll Down Button - Mobile Only */}
            <a href="#skills" className="scroll-down-btn" aria-label="Scroll down">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </a>
        </section>
    );
}
