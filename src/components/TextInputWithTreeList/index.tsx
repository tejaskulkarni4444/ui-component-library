import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Typography,
  TextField
} from "@mui/material";
import ActionModal from "../ActionModal";
import styled from "styled-components";
import { BiListUl } from 'react-icons/bi'
import TreeViewList from "../TreeViewList";

////////////////////////////
//        Types           //
///////////////////////////

type TSelectionList = string[];
export type TBorder = "standard" | "outlined" | "filled";
type TCallBack = (value: Array<any>) => void;

export interface TextInputProps {
  label: string;
  fontSize: string;
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
  listData: Array<{}>;
  hoverEffect?: boolean;
  handleReturnValue?: TCallBack,
}

type TTextfieldProps = {
  fontcolor: string,
  bordercolor: any,
  backgroundcolor: string | undefined,
  fontsize: string,
  fontfamily: string,
  width: string
}

////////////////////////
//      Styles       //
//////////////////////

//
// Styled textfield with custom border color from props
//
const StyledTextField = styled(TextField) <TTextfieldProps>`
  margin: 0 10px !important;
  font-family: ${(props: any) => props.fontfamily} !important;
  color: ${(props: any) => props.fontcolor} !important;
  background-color: ${(props: any) => props.backgroundcolor} !important;
  width: ${(props: any) => props.width} !important;
  .MuiInput-root {
    font-size: ${(props: any) => props.fontsize} !important;
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
    "id": "0001",
    "name": "Cake",
    "children":
      [
        {
          "id": "00011",
          "name": "Cake",
          "children":
            [
              { "id": "1001", "name": "Regular" },
              { "id": "1002", "name": "Chocolate" },
            ]
        },
        {
          "id": "00022",
          "name": "Bread",
        }
      ],
    "topping":
      [
        { "id": "5001", "name": "None" },
        { "id": "5002", "name": "Glazed" },
        { "id": "5005", "name": "Sugar" },
        { "id": "5007", "name": "Powdered Sugar" },
        { "id": "5006", "name": "Chocolate with Sprinkles" },
        { "id": "5003", "name": "Chocolate" },
        { "id": "5004", "name": "Maple" }
      ]
  },
  {
    "id": "0002",
    "type": "donut",
    "name": "Raised",
    "children": [
      {
        "id": "1001", "name": "Regular"
      }],
  },
  {
    "id": "0003",
    "type": "donut",
    "name": "Old Fashioned"
  }
];

const TextInputWithSearch = ({
  label,
  fontSize = '14px',
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
  searchBy = 'name',
  listData = tableData,
  handleReturnValue
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
  const handleSelectedList = (selectedOptionsList: TSelectionList) => {
    //
    // Error if multiple seleciton is off
    //
    if (!multipleSelection && selectedOptionsList.length > 1) {
      SetNotfoundError(true);
      setErrorMessage("Multiple are values not allowed")
      handleToggleModal();
      return false;
    } else {
      setSelectionList([...selectedOptionsList.map((item: any) => item[searchBy])]);
      handleToggleModal();

      if (errorMessage) {
        SetNotfoundError(false)
        setErrorMessage('')
      }
    }
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
      setErrorMessage("Multiple are values not allowed")
      return false;
    }

    //
    // Check if the array is not empty
    //
    if (splittedValues.length > 0) {
      listData.filter((currentItem: any) => {
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
        if (errorMessage) {
          setErrorMessage('')
          SetNotfoundError(false)
        }

        //
        // check if callack exists then return value to callback
        //
        if (handleReturnValue) handleReturnValue(finalMatchingArray)
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
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={500}
        color={fontColor}
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
            fontsize={fontSize}
            fontfamily={fontFamily}
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
                    <BiListUl
                      style={{
                        fontSize: '1.2em',
                        cursor: "pointer",
                        borderRadius: "50%",
                        maxWidth: "20px",
                        width: "100%",
                        padding: "3px",
                        color: `${borderColor} !important`
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          {selecitonList && selecitonList.length > 0 && (
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
              onClick={handleToggleModal}
            >
              <React.Fragment>{selecitonList.join(", ")}</React.Fragment>
            </Typography>
          )}
        </FormControl>
      </form>

      {/* Search entries popup */}
      <ActionModal
        title="Selection List"
        children={
          <TreeViewList
            returnSelectedOptions={(list) => handleSelectedList(list)}
            multipleSelection={multipleSelection}
            handleClose={handleToggleModal}
            listData={listData}
          />
        }
        open={isModalOpen}
        handleClose={handleToggleModal}
      />
    </Box>
  );
};

export default TextInputWithSearch;