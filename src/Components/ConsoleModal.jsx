import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "../ThemeContext";

const TIPS = [
    "> Skill cards are interactive! Click one to select it, then click another to swap their positions.",
    "> On desktop, you can click and drag the donut to rotate it horizontally.",
    "> Try 'theme winter' to transform the site into a cool winter wonderland!",
];

const HELP_TEXT = `Available commands:
  help     - Show this help message
  tips     - Show interactive tips for the website
  theme    - Change visual theme (winter/default)
  about    - Learn about the developer
  clear    - Clear the console
  exit     - Close the console`;

const ABOUT_TEXT = `> Nipun Grover
  Full Stack Developer
  Passionate about building beautiful, 
  interactive web experiences.
  
  Type 'tips' to discover hidden features!`;

export const ConsoleModal = ({ isOpen, onClose }) => {
    const [output, setOutput] = useState([
        { type: "system", text: "> Console initialized..." },
        { type: "system", text: "> Type 'help' for available commands" },
    ]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const { theme, setTheme } = useTheme();

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Scroll to bottom when output changes
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    const addOutput = (lines, type = "response") => {
        const newLines = Array.isArray(lines) ? lines : [lines];
        setOutput((prev) => [
            ...prev,
            ...newLines.map((text) => ({ type, text })),
        ]);
    };

    const processCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const parts = trimmed.split(" ");
        const command = parts[0];
        const args = parts.slice(1);

        // Add command to output
        addOutput(`> ${cmd}`, "command");

        switch (command) {
            case "help":
                addOutput(HELP_TEXT.split("\n"), "help");
                break;

            case "tips":
                addOutput("> Website Tips:", "system");
                TIPS.forEach((tip, i) => {
                    setTimeout(() => addOutput(tip, "tip"), i * 150);
                });
                break;

            case "theme":
                if (args[0] === "winter") {
                    setTheme(THEMES.winter);
                    addOutput("> Winter theme activated!", "success");
                } else if (args[0] === "default" || args[0] === "reset") {
                    setTheme(THEMES.default);
                    addOutput("> Default theme restored.", "success");
                } else {
                    addOutput(`Current theme: ${theme}`, "response");
                    addOutput("Usage: theme <winter|default>", "help");
                }
                break;

            case "about":
                addOutput(ABOUT_TEXT.split("\n"), "about");
                break;

            case "clear":
                setOutput([]);
                break;

            case "exit":
            case "quit":
            case "close":
                onClose();
                break;

            case "":
                break;

            default:
                addOutput(`Command not found: ${command}`, "error");
                addOutput("Type 'help' for available commands", "help");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setCommandHistory((prev) => [...prev, input]);
            setHistoryIndex(-1);
            processCommand(input);
        }
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1
                    ? historyIndex + 1
                    : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="console-overlay" onClick={onClose}>
            <div className="console-modal" onClick={(e) => e.stopPropagation()}>
                <div className="console-header">
                    <div className="console-dots">
                        <span className="dot red" onClick={onClose}></span>
                    </div>
                    <span className="console-title">nipun@portfolio:~</span>
                </div>

                <div className="console-body" ref={outputRef}>
                    {output.map((line, i) => (
                        <div key={i} className={`console-line ${line.type}`}>
                            {line.text}
                        </div>
                    ))}
                </div>

                <form className="console-input-area" onSubmit={handleSubmit}>
                    <span className="console-prompt">&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="console-input"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </form>
            </div>
        </div>
    );
};
