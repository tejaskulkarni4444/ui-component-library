import React, { useState } from "react";
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import { TBorder } from "../TextInputWithSearch";
import { IReturnValueCallback } from "../NumberInput";
import styled from "styled-components";
import { Typography } from "@mui/material";

///////////////////////////
//         Types         //
///////////////////////////

export type TError = {
  isError: boolean,
  errorMessage: string,
  index: number
}
export interface TextInputProps {
  label: string;
  fontSize?: string;
  fontFamily?: string;
  width: string;
  placeholder: string;
  font?: string,
  backgroundColor?: string,
  border?: TBorder,
  className?: string,
  effects?: string,
  hideLabel?: boolean,
  error?: Array<TError>,
  handleReturnValue: IReturnValueCallback,
  borderColor?: string;
  fontColor?: string | undefined;
  labelFontColor?: string;
  hoverEffect?: boolean;
  isRangeInput?: boolean
}

type TTextfieldProps = {
  fontcolor: string | undefined,
  bordercolor: string | undefined,
  backgroundcolor: string | undefined,
  fontsize: string,
  width: string
}

///////////////////////////
//         Styles        //
///////////////////////////

const StyleldDivContainer = styled.div`
  display: flex;
  align-items: center
`
const StyledParagraph = styled.p<{ fontSize: any, fontFamily: string, fontcolor: string | undefined }>`
  display: flex;
  align-items: center;
  font-size: ${(props: any) => props.fontSize}px;
  font-family: ${(props: any) => props.fontFamily};
  color: ${(props: any) => props.fontcolor}
`
const StyledTextField = styled(TextField) <TTextfieldProps>`
  margin: 0 10px !important;
  font-family: ${(props: any) => props.fontFamily} !important;
  color: ${(props: any) => props.fontcolor} !important;
  background-color: ${(props: any) => props.backgroundcolor} !important;
  width: ${(props: any) => props.width} !important;
  font-size: ${(props: any) => props.fontsize};
  .MuiInput-root {
    font-size: ${(props: any) => props.fontsize}px !important;
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

const TextInput = ({
  label = 'Test label',
  fontSize = '14px',
  width = '250px',
  fontFamily = "'Arial'",
  placeholder = 'This is placeholder',
  backgroundColor,
  border = 'standard',
  className,
  hideLabel = false,
  handleReturnValue,
  error = [],
  labelFontColor,
  fontColor,
  borderColor,
  isRangeInput = false
}: TextInputProps) => {

  /////////////////////////////
  //          states         //
  ////////////////////////////

  const [multiInput, setMultipInput] = useState(['', ''])
  const [isSubmitted, setIsSubmitted] = useState(false)

  ////////////////////////////
  //        handlers        //
  ///////////////////////////

  const handleChange = (ev: any, index = 0) => {
    let temp: Array<string> = multiInput;
    let value = ev.target.value;

    temp[index] = value;
    setMultipInput([...temp])
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    handleReturnValue(multiInput)
  }

  const handleBlur = () => {
    setIsSubmitted(true)
    if(handleReturnValue) handleReturnValue(multiInput)
  }

  return (
    <StyleldDivContainer>
      {!hideLabel && <StyledParagraph
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontcolor={labelFontColor}
      >
        {label}
      </StyledParagraph>}
      <FormControl error={error?.length > 0 ? true : false} style={{
        flexDirection: isRangeInput ? 'row' : 'column'
      }}>
        <StyledTextField
          placeholder={placeholder}
          variant={border}
          error={error[0] && error[0].isError === true}
          helperText={error[0] && error[0].isError && error[0].errorMessage}
          className={className}
          fontcolor={fontColor}
          width={width}
          fontsize={fontSize}
          bordercolor={borderColor}
          backgroundcolor={backgroundColor}
          onChange={(ev) => handleChange(ev)}
          onKeyPress={(ev: any) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleSubmit();
            }
          }}
          onBlur={handleBlur}
        />
        {isRangeInput &&
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <span>To</span>
            <StyledTextField
              placeholder={placeholder}
              variant={border}
              error={error[1] && error[1].isError}
              helperText={error[1] && error[1].isError && error[1].errorMessage}
              className={className}
              fontcolor={fontColor}
              width={width}
              fontsize={fontSize}
              bordercolor={borderColor}
              backgroundcolor={backgroundColor}
              onChange={(ev) => handleChange(ev, 1)}
              onKeyPress={(ev: any) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        }
      </FormControl>
      {!handleReturnValue && multiInput[0] && isSubmitted && multiInput.length > 0 && <Typography
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
        <React.Fragment>{multiInput[0]}</React.Fragment>
      </Typography>}
    </StyleldDivContainer>

  );
};

export default TextInput;