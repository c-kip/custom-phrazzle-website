import {
    Container,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import React from "react";
import GameManager from "./components/Game-Manager";

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
} as any);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <header className="Main-header">
                <Typography variant="h2">Custom Phrazzle 1.0</Typography>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="center"
                    spacing={3}
                >
                    <Typography color="green" fontSize={25}>
                        Correct Spot
                    </Typography>
                    <Typography color="orange" fontSize={25}>
                        Correct Word
                    </Typography>
                    <Typography color="blue" fontSize={25}>
                        Wrong Word
                    </Typography>
                    <Typography color="grey" fontSize={25}>
                        Not In The Phrase
                    </Typography>
                </Stack>
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
