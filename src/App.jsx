import React, { useEffect } from "react";
import PhrazzleField from "./components/Phrazzle-Start";
import Phrazzle from "./components/Phrazzle";
import { Container, ThemeProvider, createTheme } from "@mui/material";

// Create a color scheme
const theme = createTheme({
    palette: {
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
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <header className="Main-header">
                <h2>Custom Phrazzle</h2>
            </header>
            <div className="Main">
                <Container>
                    <PhrazzleField />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
