import React from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { TBorder } from "../TextInputWithSearch";
import { IReturnValueCallback } from "../NumberInput";

export interface TextInputProps {
  label: string;
  fontSize?: number | string;
  width: number | string;
  placeholder: string;
  font?: string,
  backgroundColor?: string,
  border?: TBorder,
  className?: string,
  effects?: string,
  hideLabel?: boolean,
  handleReturnValue: IReturnValueCallback
}

const TextInput = ({
  label = 'Test label',
  fontSize,
  width,
  placeholder = 'This is placeholder',
  backgroundColor,
  border = 'standard',
  className,
  hideLabel = false,
  handleReturnValue
}: TextInputProps) => {

  const handleSubmit = (ev: any) => {
    console.log('evvvvv', ev.target.value)
    if(ev.target.value) handleReturnValue(ev.target.value)
  }
  return <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {!hideLabel && <Typography 
      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
      fontSize={fontSize}
    >
      {label}
    </Typography>}
    <FormControl sx={{ m: 1, width: '25ch' }}>
      <TextField
        id="input-with-sx"
        placeholder={placeholder}
        variant={border}
        className={className}
        onKeyPress={(ev: any) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            handleSubmit(ev);
          }
        }}
      />
    </FormControl>
  </Box>;
};

export default TextInput;