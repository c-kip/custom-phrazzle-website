import React, { useEffect } from "react";
import GameManager from "./components/Game-Manager";
import {
    Container,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";

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
                <Typography variant="h2">Custom Phrazzle 1.0</Typography>
            </header>
            <div className="Main">
                <Container>
                    <GameManager />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
