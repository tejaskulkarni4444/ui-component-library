import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import { TBorder } from "../TextInputWithSearch";
import { IReturnValueCallback } from "../NumberInput";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { defaultErrorState } from "../DateInput";

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
  borderColor?: string,
  fontColor?: string | undefined,
  labelFontColor?: string,
  hoverEffect?: boolean,
  isRangeInput?: boolean,
  clearInput?: boolean,
  minChars?: string | number,
  maxChars?: string | number,
  defaultValue?: string,
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
  isRangeInput = false,
  clearInput = false,
  defaultValue,
  minChars,
  maxChars
}: TextInputProps) => {

  /////////////////////////////
  //          states         //
  ////////////////////////////

  const [multiInput, setMultipInput] = useState(['', ''])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [localError, setLocalError] = useState<Array<TError>>(defaultErrorState);

  //
  // Input references used for focusing
  //
  const input1Ref: any = useRef(null)
  const input2Ref: any = useRef(null)

  //////////////////////
  //     useeffect    //
  /////////////////////

  useEffect(() => {
    const defaultInput = ['', '']
    setMultipInput(defaultInput)

    // Uncomment below line if empty input needs to be returned
    if (handleReturnValue && clearInput) handleReturnValue(defaultInput)
  }, [clearInput])

  ////////////////////////////
  //        handlers        //
  ///////////////////////////

  const handleChange = (ev: any, index = 0) => {
    //
    // Check if max char limit has exceeded
    //
    if (maxChars && ev.target.value.length > maxChars) return false;

    // Set isSubmitted to false to verify new value
    setIsSubmitted(false);

    let temp: Array<string> = multiInput;
    let value = ev.target.value;

    temp[index] = value;
    setMultipInput([...temp])
  }

  const handleSubmit = (isLastInput = false) => {
    const defaultInputValue = ['', '']
    let errorState = localError; //Error state holder

    // 
    // if input is empty and default value exists
    // assign default value to input
    //
    if (multiInput.toString() === defaultInputValue.toString() && defaultValue) {
      setMultipInput([defaultValue, isRangeInput ? defaultValue : ''])
    }

    if (isRangeInput && !isLastInput) {
      input2Ref.current.focus()
      return;
    }

    //
    // check if submitted input is less than provided min characters
    // 
    if (minChars) {
      if (isRangeInput) {
        if (multiInput[0].length < minChars) {
          errorState[0] = {
            isError: true,
            errorMessage: `Minimum input length should be ${minChars}`,
            index: 0
          }
          setLocalError([...errorState])
          return false;
        }
        if (multiInput[1].length < minChars) {
          errorState[1] = {
            isError: true,
            errorMessage: `Minimum input length should be ${minChars}`,
            index: 1
          }
          setLocalError([...errorState])
          return false;
        }
      } else {
        if (multiInput[0].length < minChars) {
          errorState[0] = {
            isError: true,
            errorMessage: `Minimum input length should be ${minChars}`,
            index: 0
          }
          setLocalError([...errorState])
          return false;
        }
      }
    }

    setIsSubmitted(true)
    if (handleReturnValue) handleReturnValue(multiInput)
  }

  const handleBlur = () => {
    setIsSubmitted(true)
    if (handleReturnValue) handleReturnValue(multiInput)
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
          error={(error[0] && error[0].isError === true) || (localError[0] && localError[0].isError)}
          helperText={error[0] && error[0].isError ? error[0].errorMessage : localError[0].errorMessage}
          value={multiInput[0]}
          inputRef={input1Ref}
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
          onBlur={() => isRangeInput ? '' : handleSubmit(false)}
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
              error={(error[1] && error[1].isError === true) || (localError[1] && localError[1].isError)}
              helperText={error[1] && error[1].isError ? error[1].errorMessage : localError[1].errorMessage}
              className={className}
              inputRef={input2Ref}
              value={multiInput[1]}
              fontcolor={fontColor}
              width={width}
              fontsize={fontSize}
              bordercolor={borderColor}
              backgroundcolor={backgroundColor}
              onChange={(ev) => handleChange(ev, 1)}
              onKeyPress={(ev: any) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleSubmit(true);
                }
              }}
              onBlur={() => handleSubmit(true)}
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
        <React.Fragment>{isRangeInput ? `${multiInput[0]} TO ${multiInput[1]}` : multiInput[0]}</React.Fragment>
      </Typography>}
    </StyleldDivContainer>

  );
};

export default TextInput;