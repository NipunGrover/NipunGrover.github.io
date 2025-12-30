import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = {
    default: "default",
    winter: "winter",
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage for saved theme
        const saved = localStorage.getItem("site-theme");
        return saved && Object.values(THEMES).includes(saved) ? saved : THEMES.default;
    });

    useEffect(() => {
        // Apply theme class to document
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("site-theme", theme);
    }, [theme]);

    const toggleTheme = (newTheme) => {
        if (Object.values(THEMES).includes(newTheme)) {
            setTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: toggleTheme, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
