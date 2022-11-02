import React, { useState } from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { handleFormatIntegers, handleValidateInteger } from "../../utils/helpers";
import { TBorder } from "../TextInputWithSearch";
import { StyledValueContainer } from "../DateInput";
import styled from "styled-components";
import { TError } from "../TextInput";

type TInputType = 'integer' | 'decimal' | 'decimalMasking' | 'amount'
export type IReturnValueCallback = (value: string | Array<string>) => void;


export interface NumberInputProps {
    label: string;
    fontSize: string;
    width: string;
    placeholder: string;
    font: string,
    fontColor?: string,
    backgroundColor?: string,
    borderColor?: string,
    border?: TBorder,
    className?: string,
    effects?: string,
    type?: TInputType,
    hideLabel?: boolean,
    isRangeInput?: boolean,
    handleReturnValue: IReturnValueCallback
}

type TTextfieldProps = {
    fontcolor?: string | undefined,
    bordercolor?: string | undefined,
    backgroundcolor?: string | undefined,
    fontsize?: string,
    width?: string
}

//////////////////////////
//       Styles         //
//////////////////////////

const StyledTextField = styled(TextField) <TTextfieldProps>`
  margin: 0 10px !important;
  font-family: ${(props: any) => props.fontFamily} !important;
  color: ${(props: any) => props.fontcolor} !important;
  background-color: ${(props: any) => props.backgroundcolor} !important;
  width: ${(props: any) => props.width} !important;
  font-size: ${(props: any) => props.fontsize};
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

const NumberInput = ({
    fontSize,
    label,
    placeholder,
    type = 'integer',
    className,
    handleReturnValue,
    width = '300px',
    border = 'standard',
    hideLabel = false,
    isRangeInput = false,
    fontColor = '#000000',
    backgroundColor,
    borderColor
}: NumberInputProps) => {
    const defaultErrorState = [
        {
            isError: false,
            errorMessage: '',
            index: 0
        },
        {
            isError: false,
            errorMessage: '',
            index: 1
        }
    ]

    ////////////////////////////
    //        States          //
    ////////////////////////////

    const [inputValue, setInputValue] = useState('')
    const [multiInput, setMultipInput] = useState(['', ''])
    const [error, setError] = useState <Array<TError>>(defaultErrorState)
    const [formattedInput, setformattedInput] = useState <Array<string>>([])

    /////////////////////
    //      handler    //
    /////////////////////

    const handleSetValue = (val: string, inputIndex: number = 0) => {
        if (isRangeInput) {
            let temp: Array<string> = multiInput;
            temp[inputIndex] = val;
            setMultipInput([...temp])
        } else {
            setInputValue(val)
        }
    }

    const handleSubmit = () => {
        if(isRangeInput) {
            multiInput.map((currentInput, index) => {
                handleValidation(currentInput, index)
            })
        } else {
            handleValidation(inputValue)
        }
    }

    const handleValidation = (value: string, index = 0) => {
        let currentFormattedValues: Array<any> = formattedInput;
        let errorState = error; //Error state holder
        //
        // return error if value is empty
        //
        if (value === '') {
            errorState[index] = {
                isError: true,
                errorMessage: 'Empty input not allowed',
                index: index
            }
            setError([...errorState])
            if (formattedInput) setformattedInput([''])
            return false;
        }

        //
        // Check if given input only contains integers
        //
        if (handleValidateInteger(value)) {
            //
            // if input type is integer
            //
            if (type === 'integer') {
                if (value.includes('.') || value.includes(',')) {
                    errorState[index] = {
                        isError: true,
                        errorMessage: 'Invalid input',
                        index: index
                    }
                    setError([...errorState])
                } else {
                    errorState[index] = {
                        isError: false,
                        errorMessage: '',
                        index: index
                    }
                    setError([...errorState])
                }
                if(!currentFormattedValues[index]) currentFormattedValues[index] = ''
                currentFormattedValues[index] = value
                setformattedInput([...currentFormattedValues])
                return;
            }
            // const formattedVal = handleFormatIntegers(value)
            currentFormattedValues[index] = handleFormatIntegers(value)
            setformattedInput([...currentFormattedValues])
            errorState[index] = {
                isError: false,
                errorMessage: '',
                index: index
            }
            setError([...errorState])
        } else {
            errorState[index] = {
                isError: true,
                errorMessage: 'Only integers are allowed',
                index: index
            }
            setError([...errorState])
            return false;
        }

        //
        // return input value via callback
        //        
        if (!error[0].isError && !error[1].isError && value && handleReturnValue) {
            //
            // if range input then return value if its last input
            // or return value if single input
            //
            if((isRangeInput && index === 1)) {
                handleReturnValue(multiInput)
            } else if (!isRangeInput) {
                handleReturnValue(value)
            }
        }
    }
    
    return <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <Typography
            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            fontSize={fontSize}
            color={fontColor}
        >
            {label}
        </Typography>
        <FormControl
            sx={{ m: 1, flexDirection: isRangeInput ? 'row' : 'column' }}
            variant="standard"
            error={error[0] || error[1] ? true : false}
        >
            <StyledTextField
                placeholder={placeholder}
                type='text'
                className={className}
                fontcolor={fontColor}
                dir={type === 'amount' ? 'rtl' : 'ltr'}
                width={width}
                fontsize={fontSize}
                bordercolor={borderColor}
                backgroundcolor={backgroundColor}
                variant={border}
                error={error[0] && error[0].isError ? true : false}
                helperText={error[0] && error[0].isError && error[0].errorMessage}
                aria-activedescendant=""
                onChange={(e: any) => handleSetValue(e.target.value, 0)}
                value={isRangeInput ? multiInput[0] : inputValue}
                onKeyPress={(ev: any) => {
                    if (ev.key === "Enter") {
                        ev.preventDefault();
                        handleSubmit();
                    }
                }}
                onBlur={handleSubmit}
            />
            {isRangeInput &&
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: fontSize,
                        color: fontColor
                    }}>To</span>
                    <StyledTextField
                        placeholder={placeholder}
                        type='text'
                        className={className}
                        fontcolor={fontColor}
                        width={width}
                        fontsize={fontSize}
                        bordercolor={borderColor}
                        backgroundcolor={backgroundColor}
                        variant={border}
                        error={error[1] && error[1].isError ? true : false}
                        helperText={error[1] && error[1].isError && error[1].errorMessage}
                        aria-activedescendant=""
                        onChange={(e: any) => handleSetValue(e.target.value, 1)}
                        value={isRangeInput ? multiInput[1] : inputValue}
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
        {formattedInput.length > 0 && !error[0].isError && !error[1].isError && (
            <StyledValueContainer fontSize={fontSize}>
                {formattedInput.length > 1 ? `${formattedInput.join(' To ')}` : formattedInput}
            </StyledValueContainer>
        )}
    </Box>;
};

export default NumberInput;