import React from "react";
import { TextField } from "@mui/material";

function PhrazzleField() {
    const isInvalid: boolean = false;

    return (
        <TextField
            label="Enter phrase here"
            variant="standard"
            error={isInvalid}
        ></TextField>
    );
}

export default PhrazzleField;
