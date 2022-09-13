import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ActionModal from "../ActionModal";
// import SearchableList from "../SearchableList";
//@ts-ignore
import styled from "styled-components";
import SearchableTable from "../SearchableTable";

////////////////////////////
//        Types           //
///////////////////////////

type TSelectionList = string[];
type TBorder = "standard" | "outlined" | "filled";
export interface TextInputProps {
  label: string;
  fontSize: number | string;
  width: string;
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
  modalCloseButton?: boolean;
  searchBy: string;
  listData?: Array<{}>;
  hoverEffect?: boolean;
}

////////////////////////
//      Styles       //
//////////////////////

//
// Styled textfield with custom border color from props
//
const StyledTextField = styled(TextField)`
  margin: 0 10px !important;
  font-family: ${(props: any) => props.fontFamily} !important;
  color: ${(props: any) => props.fontcolor} !important;
  background-color: ${(props: any) => props.backgroundcolor} !important;
  width: ${(props: any) => props.width} !important;
  .MuiInput-root {
    font-size: ${(props: any) => props.fontSize}px !important;
  }
  & .MuiInputBase-input {
    color: ${(props: any) => props.fontcolor} !important;
  }
  & .MuiInput-underline::before {
    border-color: ${(props: any) => props.bordercolor};
  }
  & .MuiInput-underline::after {
    border-color: ${(props: any) => props.bordercolor};
  }
  & fieldset {
    border-color: ${(props: any) => props.bordercolor};
  }
  & .muioutlinedinput-notchedoutline: {
    border: solid 1px ${(props: any) => props.bordercolor};
  },
  &:hover .muioutlinedinput-notchedoutline: {
    border-color: ${(props: any) => props.bordercolor};
    border-radius: 4px;
  },
  &.mui-focused .muioutlinedinput-notchedoutline: {
    border-color: ${(props: any) => props.bordercolor};
  }
`;

// TODO: remove this
const tableData = [
  {
    // "id": "1",
    'name': "Retired",
    city: "London",
  },
  {
    // "id": "2",
    'name': "Doctor",
    city: "Madrid",
  },
  {
    // "id": "3",
    'name': "Architect",
    city: "Paris",
  },
  {
    // "id": "4",
    'name': "Engineer",
    city: "Alabama",
  },
  {
    // "id": "5",
    'name': "Business",
    city: "Nashik",
  },
  {
    // "id": "6",
    'name': "Student",
    city: "NY",
  },
  {
    // "id": "7",
    'name': "Service",
    city: "Alabama",
  },
  {
    // "id": "8",
    'name': "Teacher",
    city: "Alabama",
  },
  {
    // "id": "9",
    'name': "Teller",
    city: "Mumbai",
  },
];

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
  labelFontColor = "#000000",
  backgroundColor,
  width,
  searchBy = 'name'
}: TextInputProps) => {
  ///////////////////////
  //      states      //
  //////////////////////

  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [selecitonList, setSelectionList] = useState<TSelectionList>([]);
  const [notfoundError, SetNotfoundError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  ///////////////////////////
  //        handlers       //
  //////////////////////////

  //
  // Open and close modal
  //
  const handleToggleModal = () => {
    SetIsModalOpen(!isModalOpen);
  };

  //
  // save selected values
  //
  const handleSelectedList = (list: TSelectionList) => {
    setSelectionList([...list.map((item: any) => item[searchBy])]);
    handleToggleModal();
  };

  //
  // Set input state
  //
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  //
  // Handle input validation once user hits enter key
  //
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (e) {
      handleInputValidation(e.target.value);
    }
  };

  const handleInputValidation = (inputValue: string) => {
    //
    // Array of individual values added in input
    //
    let splittedValues = inputValue.split(",");
    let finalMatchingArray: Array<string> = []; // Array with matched values

    //
    // Error if multiple seleciton is off
    //
    if (!multipleSelection && splittedValues.length > 1) {
      SetNotfoundError(true);
      setErrorMessage("Multiple values not allowed")
      return false;
    }

    //
    // Check if the array is not empty
    //
    if (splittedValues.length > 0) {
      tableData.filter((currentItem: any) => {
        splittedValues.some((item: any) => {
          //
          // Check if current item in loop matches splitted input values
          //
          if (currentItem[searchBy].trim().toLowerCase() === item.trim().toLowerCase()) {
            finalMatchingArray.push(currentItem[searchBy])
          }
        });
      })

      // Check if all inserted values match
      if (splittedValues.length === finalMatchingArray.length) {
        SetNotfoundError(false);
        setSelectionList([...finalMatchingArray]);
        setInputValue("");
      } else {
        SetNotfoundError(true);
        setErrorMessage("Invalid Input")
      }
    }
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", fontFamily: fontFamily }}>
      {/* Input label */}
      <Typography
        fontSize={`${fontSize}px`}
        fontFamily={fontFamily}
        fontWeight={500}
        color={labelFontColor}
      >
        {label}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Text input */}
        <FormControl
          style={{
            display: "flex",
            flexDirection: "row",
            // background: backgroundColor
          }}
          error={notfoundError}
        >
          <StyledTextField
            variant={border}
            placeholder={placeholder}
            className={className}
            autoComplete="off"
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontcolor={fontColor}
            backgroundcolor={backgroundColor}
            bordercolor={borderColor}
            width={width}
            value={inputValue}
            error={notfoundError}
            helperText={notfoundError && errorMessage}
            onChange={handleChange}
            onKeyPress={(ev: any) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                handleSubmit(ev);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div onClick={handleToggleModal}>
                    <ListAltIcon
                      sx={{
                        fontSize: `${fontSize}px`,
                        cursor: "pointer",
                        borderRadius: "50%",
                        maxWidth: "20px",
                        width: "100%",
                        padding: "3px",
                        color: `${borderColor} !important`,
                        "&:hover": {
                          backgroundColor: "lightgray",
                          color: "#ffffff !important",
                        },
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          {selecitonList && selecitonList.length > 0 && (
            <Tooltip title="Click to remove" onClick={handleToggleModal}>
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
      </form>

      {/* Search entries popup */}
      <ActionModal
        title="Selection List"
        children={
          <SearchableTable
            returnSelectedOptions={(list) => handleSelectedList(list)}
            multipleSelection={multipleSelection}
            handleClose={handleToggleModal}
            tableData={tableData}
          />
        }
        open={isModalOpen}
        handleClose={handleToggleModal}
      />
    </Box>
  );
};

export default TextInputWithSearch;