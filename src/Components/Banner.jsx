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
        </section>
    );
}
