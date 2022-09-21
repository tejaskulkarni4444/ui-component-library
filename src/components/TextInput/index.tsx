import React from "react";
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import { TBorder } from "../TextInputWithSearch";
import { IReturnValueCallback } from "../NumberInput";
import styled from "styled-components";
///////////////////////////
//         Types         //
///////////////////////////

type TError = {
  isError: boolean,
  errorMessage: string
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
  error?: TError
  handleReturnValue: IReturnValueCallback,
  borderColor?: string;
  fontColor?: string | undefined;
  labelFontColor?: string;
  hoverEffect?: boolean;
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
  error,
  labelFontColor,
  fontColor,
  borderColor
}: TextInputProps) => {

  const handleSubmit = (ev: any) => {
    handleReturnValue(ev.target.value)
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
      <FormControl error={error?.isError}>
        <StyledTextField
          placeholder={placeholder}
          variant={border}
          error={error?.isError}
          helperText={error?.isError && error.errorMessage}
          className={className}
          fontcolor={fontColor}
          width={width}
          fontsize={fontSize}
          bordercolor={borderColor}
          backgroundcolor={backgroundColor}
          onKeyPress={(ev: any) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleSubmit(ev);
            }
          }}
        />
      </FormControl>
    </StyleldDivContainer>

  );
};

export default TextInput;