import { useState } from "react";
import mountainsBg from "../assets/images/hero/hero-bg.svg";
import winterBg from "../assets/images/hero/winter-hero-bg.svg";
import { Donut } from "./Donut";
import { ConsoleModal } from "./ConsoleModal";
import { useTheme, THEMES } from "../ThemeContext";

export const Banner = () => {
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const { theme } = useTheme();

    const currentBg = theme === THEMES.winter ? winterBg : mountainsBg;

    return (
        <section className="banner" id="home">
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
                onClick={() => setIsConsoleOpen(true)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsConsoleOpen(true)}
            >
                {">"} Detecting Full Stack Developer...<br />
                {">"} User [Nipun] active<span className="cursor">_</span>
            </div>

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
