import { TextField } from "@mui/material";
import React from "react";

export interface TextInputProps {
  label: string;
  fontSize: number | string;
  width: number | string;
}

const TextInput = (props: TextInputProps) => {
  return <TextField
    label={props.label} 
  />;
};

export default TextInput;