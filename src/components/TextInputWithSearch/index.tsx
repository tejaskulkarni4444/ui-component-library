import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Tooltip,
  Typography,
  TextField
} from "@mui/material"; 
import ListAltIcon from "@mui/icons-material/ListAlt";
import ActionModal from "../ActionModal";
import SearchableList from "../SearchableList";
//@ts-ignore
import styled from 'styled-components';

////////////////////////////
//        Types           //
///////////////////////////

type TSelectionList = string[];

type TBorder = "standard" | "outlined" | "filled";

  ////////////////////////
  //      Styles       //
  //////////////////////

  //
  // Styled textfield with custom border color from props
  //
  const StyledTextField = styled(TextField)`
      margin: 0 10px !important;
      font-family: ${(props:any) => props.fontfamily} !important;
      color: ${(props:any) => props.fontcolor} !important;
      .MuiInput-root {
        font-size: ${(props:any) => props.fontsize}px !important;
      }
      & .MuiInputBase-input {
        color: ${(props:any) => props.fontcolor} !important;
      }
      & .MuiInput-underline::before {
        border-color: ${(props:any) => props.bordercolor} !important;
      }
      & .MuiInput-underline::after {
        border-color: ${(props:any) => props.bordercolor} !important;
      }
      & fieldset {
        border-color: ${(props:any) => props.bordercolor} !important
      }
      & .MuiOutlinedInput-notchedOutline: {
        border: solid 1px ${(props:any) => props.bordercolor} !important;
      },
      &:hover .MuiOutlinedInput-notchedOutline: {
        border-color: ${(props:any) => props.bordercolor} !important
      },
      &.Mui-focused .MuiOutlinedInput-notchedOutline: {
        border-color: ${(props:any) => props.bordercolor} !important
      }
  `

export interface TextInputProps {
  label: string;
  fontSize: number | string;
  width: number | string;
  placeholder: string;
  fontFamily: string;
  backgroundColor?: string;
  border?: TBorder;
  className?: string;
  effects?: string;
  multipleSelection?: boolean;
  borderColor?: string;
  fontColor?: string;
  labelFontColor?: string;
  modalCloseButton?: boolean
}

const TextInputWithSearch = ({
  label,
  fontSize,
  placeholder,
  fontFamily = "'Arial'",
  className,
  border = "standard",
  multipleSelection = true,
  fontColor = "#000000",
  borderColor = "#cfcfcf",
  labelFontColor = "#000000"
}: TextInputProps) => {

  ///////////////////////
  //      states      //
  //////////////////////

  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [selecitonList, setSelectionList] = useState<TSelectionList>([]);

  ///////////////////////////
  //        handlers      //
  //////////////////////////

  const handleToggleModal = () => {
    SetIsModalOpen(!isModalOpen);
  };

  const handleSelectedList = (list: TSelectionList) => {
    setSelectionList(list);
    handleToggleModal();
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", fontFamily: fontFamily }}
    >
      {/* Input label */}
      <Typography
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        fontWeight={500}
        color={labelFontColor}
      >
        {label}
      </Typography>

      {/* Text input */}
      <FormControl
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <StyledTextField
          variant={border}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
          fontsize={fontSize}
          fontfamily={fontFamily}
          fontcolor={fontColor}
          sx={{
            // fontSize: `${fontSize}px`,
            // fontFamily: fontFamily,
            // color: fontColor,
          }}
          bordercolor={borderColor}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div onClick={handleToggleModal}>
                  <ListAltIcon
                    sx={{
                      fontSize: `${fontSize}px`,
                      cursor: "pointer",
                      borderRadius: '50%',
                      maxWidth: '20px',
                      width: '100%',
                      padding: '3px',
                      "&:hover": {
                        backgroundColor: 'lightgray'
                      }
                    }}
                  />
                </div>
              </InputAdornment>
            )
          }}
        />
        {selecitonList && selecitonList.length > 0 && (
          <Tooltip title="Click to remove">
            <Typography
              sx={{
                mr: 1,
                my: 0.5,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              fontSize={`${fontSize}px`}
              fontFamily={fontFamily}
              fontWeight={600}
              variant="subtitle1"
            >
              <React.Fragment>{selecitonList.join(", ")}</React.Fragment>
            </Typography>
          </Tooltip>
        )}
      </FormControl>

      {/* Search entries popup */}
      <ActionModal
        title="Selection List"
        children={
          <SearchableList
            returnSelectedOptions={(list) => handleSelectedList(list)}
            multipleSelection={multipleSelection}
          />
        }
        open={isModalOpen}
        handleClose={handleToggleModal}
      />
    </Box>
  );
};

export default TextInputWithSearch;