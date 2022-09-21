import React,{ useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Typography,
  TextField
} from "@mui/material";
import ActionModal from "../ActionModal";
import styled from "styled-components";
import ListTable from "../ListTable";
import { BiListUl } from 'react-icons/bi'
import { IReturnValueCallback } from "../NumberInput";

////////////////////////////
//        Types           //
///////////////////////////

type TSelectionList = string[];
export type TBorder = "standard" | "outlined" | "filled";

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
  onChange?: IReturnValueCallback,
}

type TTextfieldProps ={
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
const StyledTextField = styled(TextField)<TTextfieldProps>`
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
    "id": "1",
    'name': "Retired",
    city: "London",
  },
  {
    "id": "2",
    'name': "Doctor",
    city: "Madrid",
  },
  {
    "id": "3",
    'name': "Architect",
    city: "Paris",
  },
  {
    "id": "4",
    'name': "Engineer",
    city: "Alabama",
  },
  {
    "id": "5",
    'name': "Business",
    city: "Nashik",
  },
  {
    "id": "6",
    'name': "Student",
    city: "NY",
  },
  {
    "id": "7",
    'name': "Service",
    city: "Alabama",
  },
  {
    "id": "8",
    'name': "Teacher",
    city: "Alabama",
  },
  {
    "id": "9",
    'name': "Teller",
    city: "Mumbai",
  },
];

const TextInputWithSearch = ({
  label,
  fontSize = '14px',
  placeholder,
  fontFamily = "'Arial'",
  className,
  border = "standard",
  multipleSelection = false,
  fontColor = "#000000",
  borderColor = "#cfcfcf",
  labelFontColor = "#000000",
  backgroundColor,
  width,
  searchBy = 'name',
  listData = tableData
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
      
      if(errorMessage) {
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
        if(errorMessage) {
          setErrorMessage('')
          SetNotfoundError(false)
        }
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
            <ListTable
              returnSelectedOptions={(list) => handleSelectedList(list)}
              multipleSelection={multipleSelection}
              handleClose={handleToggleModal}
              tableData={listData}
            />
          }
          open={isModalOpen}
          handleClose={handleToggleModal}
        />
    </Box>
  );
};

export default TextInputWithSearch;