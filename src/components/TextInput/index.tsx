import React from "react";
import { Box, FormControl, Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export interface TextInputProps {
  label: string;
  fontSize: number | string;
  width: number | string;
  placeholder: string;
  font: string,
  backgroundColor?: string,
  border?: string,
  className?: string,
  effects?: string
}

const TextInput = (props: TextInputProps) => {
  return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <Typography 
      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
      fontSize={props.fontSize}
    >
      {props.label}
    </Typography>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
      <Input
        id="input-with-sx"
        placeholder={props.placeholder}
        className=""
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  </Box>;
};

export default TextInput;