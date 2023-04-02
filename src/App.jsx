import React from "react";
import PhrazzleField from "./components/Phrazzle-Field";
import Phrazzle from "./components/Phrazzle";
import { createTheme } from "@mui/material";

// Create a color scheme
const theme = createTheme({
    letter: {
        text: {
            light: "#ffffff",
            dark: "#000000",
        },
        background: {
            guess: "#ffffff",
            miss: "#757575",
            diffWord: "#0d47a1",
            close: "#ef6c00",
            correct: "#00c853",
        },
    },
});

function App() {
    return (
        <div>
            <header className="Main-header">
                <h2>Custom Phrazzle</h2>
            </header>
            <div className="Main">
                <PhrazzleField />
                <Phrazzle phrase="apple for two" />
            </div>
        </div>
    );
}

export default App;
