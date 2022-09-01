import React, { useState } from "react";
import { Box, FormControl, Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ActionModal from "../ActionModal";
import SearchableList from "../SearchableList";

export interface TextInputProps {
  label: string;
  fontSize: number | string;
  width: number | string;
  placeholder: string;
  fontFamily: string,
  backgroundColor?: string,
  border?: string,
  className?: string,
  effects?: string
}

const TextInput = ({
  label,
  fontSize,
  width,
  placeholder,
  fontFamily = "'Arial'",
  className
}: TextInputProps) => {
  ///////////////////////
  //      states      //
  //////////////////////

  const [isModalOpen, SetIsModalOpen] = useState(false)

  ///////////////////////////
  //        handlers      //
  //////////////////////////

  const handleToggleModal = () => {
    SetIsModalOpen(!isModalOpen)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', fontFamily: fontFamily }}>
      {/* Input label */}
      <Typography
        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
      >
        {label}
      </Typography>
      
      {/* Text input */}
      <FormControl sx={{ width: '25ch' }} variant="standard">
        <Input
          id="input-with-sx"
          placeholder={placeholder}
          className={className}
          sx={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily
          }}
          endAdornment={
            <InputAdornment position="end">
              <div onClick={handleToggleModal}>
                <SearchIcon
                  sx={{
                    fontSize: `${fontSize}px`,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Search entries popup */}
      <ActionModal
        title="Search users"
        children={<SearchableList />}
        open={isModalOpen}
        handleClose={handleToggleModal}
      />
    </Box>);
};

export default TextInput;