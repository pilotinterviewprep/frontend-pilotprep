"use client"

import type { TextFieldProps } from "@mui/material";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled((props: TextFieldProps) => (
    <TextField {...props} />
))(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
        border: "none",
        padding: "20px",
    },
    " & .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },

}));
