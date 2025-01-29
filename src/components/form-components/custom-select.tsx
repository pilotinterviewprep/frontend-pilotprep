"use client";

import type { SelectProps } from "@mui/material";

import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

// CustomSelect component
export const CustomSelect = styled((props: SelectProps) => (
    <Select {...props} />
))(({ theme }) => ({
    
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
}));

