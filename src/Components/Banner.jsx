import mountainsBg from "../assets/images/hero/hero-bg.svg";
import { Donut } from "./Donut";

export const Banner = () => {

    return (
        <section className="banner" id="home">
            {/* Background NIPUN Text */}
            <span className="nipun-bg-text" aria-hidden="true">NIPUN</span>

            {/* Mountain Layer */}
            <div className="mountain-layer" style={{ backgroundImage: `url(${mountainsBg})` }}></div>

            {/* 3D Donut */}
            <div className="banner-donut" aria-hidden="true">
                <Donut />
            </div>

            {/* System Boot Text - Absolute Positioned per CSS (bottom left) */}
            <div className="system-boot-text">
                {">"} Detecting Full Stack Developer...<br />
                {">"} User [Nipun] active<span className="cursor">_</span>
            </div>

            {/* Scroll Down Button - Mobile Only */}
            <a href="#skills" className="scroll-down-btn" aria-label="Scroll down">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </a>
        </section>
    );
}
