import React, { useEffect, useRef, useState } from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { handleFormatIntegers, handleValidateInteger } from "../../utils/helpers";
import { TBorder } from "../TextInputWithSearch";
import styled from "styled-components";
import { TError } from "../TextInput";

type TInputType = 'integer' | 'decimal' | 'decimalMasking' | 'amount'
export type IReturnValueCallback = (value: string | object) => void;

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
    clearInput?: boolean,
    defaultValue?: string,
    minChars?: string | number,
    maxChars?: string | number,
    decimalLength?: number,
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
    width = '200px',
    border = 'standard',
    hideLabel = false,
    isRangeInput = false,
    fontColor = '#000000',
    backgroundColor,
    borderColor,
    clearInput = false,
    defaultValue,
    minChars,
    maxChars,
    decimalLength = 2
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

    const [multiInput, setMultipInput] = useState(['', ''])
    const [error, setError] = useState<Array<TError>>(defaultErrorState)
    const [formattedInput, setformattedInput] = useState<Array<string>>([])
    const [isSubmitted, setIsSubmitted] = useState(false)

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
        setformattedInput([])
        // Uncomment below line if empty input needs to be returned
        // if(handleReturnValue) handleReturnValue(defaultInput)
    }, [clearInput])

    /////////////////////
    //      handler    //
    /////////////////////

    const characterValidation = (inputValue: string) => {
        var validNumber = new RegExp(/^\d*\.?\d*$/);
        return validNumber.test((inputValue))
    }

    const handleSetValue = (val: string, inputIndex: number = 0) => {
        // 
        // If alphabet or other characters are presnet return false
        // 
        if (!characterValidation(val)) return false;

        if (maxChars && val.length > maxChars) return false

        let temp: Array<string> = multiInput;
        temp[inputIndex] = val;
        setMultipInput([...temp])
    }

    const handleSubmit = (isLastInput = false) => {
        // Don't validate again if submitted
        if (isSubmitted) return;

        if (isRangeInput && !isLastInput) {
            input2Ref.current.focus()
            return;
        }

        if (isRangeInput) {
            multiInput.map((currentInput, index) => {
                handleValidation(currentInput, index)
            })
            setIsSubmitted(true)
        } else {
            handleValidation(multiInput[0])
            setIsSubmitted(true)
        }
    }

    const handleValidation = (currentValue: string, index = 0) => {
        let currentFormattedValues: Array<any> = formattedInput;
        let errorState = error; //Error state holder

        //
        // return error if value is empty
        //
        if (currentValue === '') {
            // 
            // if the submitted input is less than min characters accepted.
            // 
            if (minChars && currentValue.length < minChars) {
                errorState[index] = {
                    isError: true,
                    errorMessage: `Minimum Input length should be ${minChars}`,
                    index: index
                }
                setError([...errorState])
                if (formattedInput) setformattedInput([''])
                return false;
            }
            if (type === 'integer') {
                currentValue = defaultValue ? defaultValue : '0'
            } else {
                // Decimal, amount, decimal masking
                currentValue = defaultValue ? defaultValue : '0.00'
            }
        }

        //
        // Check if given input only contains integers
        //
        if (handleValidateInteger(currentValue)) {
            //
            // if input type is integer
            //
            if (type === 'integer') {
                if (currentValue.includes('.') || currentValue.includes(',')) {
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
                if (!currentFormattedValues[index]) currentFormattedValues[index] = ''
                currentFormattedValues[index] = currentValue
                setformattedInput([...currentFormattedValues])
                return;
            }

            // if true add .00 at the end if there is not post decimal value
            const isPostDecimalMaskingRequired = type === 'amount' || type === 'decimal' || type === 'decimalMasking' ? true : false
            currentFormattedValues[index] = handleFormatIntegers(currentValue, isPostDecimalMaskingRequired, decimalLength)
            setformattedInput([...currentFormattedValues])

            // Clear errors after setting input value
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
        // Check if 1st input is smaller than 2nd
        // 
        if ((multiInput[0] > multiInput[1]) && index === 1) {
            // return error for 1st input
            errorState[0] = {
                isError: true,
                errorMessage: 'First value must be less than second value',
                index: 0
            }
            setError([...errorState]);
            return false;
        }

        //
        // return input value via callback
        //        
        if (!error[0].isError && !error[1].isError && currentValue && handleReturnValue) {
            let payload = {
                rawValues: multiInput,
                formattedValues: formattedInput
            }
            //
            // if range input then return value if its last input
            // or return value if single input
            //
            if ((isRangeInput && index === 1)) {
                handleReturnValue(payload)

            } else if (!isRangeInput) {
                payload.rawValues = [currentValue]
                handleReturnValue(payload)
            }
        }
    }

    const handleClearInput = (val: string, index: number) => {
        setIsSubmitted(false)
        let temp: Array<string> = multiInput;   // Stores current state

        // 
        // setting input values to last entered character
        // 
        temp[index] = val[val.length - 1];  // Set last input character as first
        setMultipInput([...temp])
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
                inputRef={input1Ref}
                fontsize={fontSize}
                defaultValue={type === 'amount' && 0}
                bordercolor={borderColor}
                backgroundcolor={backgroundColor}
                variant={border}
                error={error[0] && error[0].isError ? true : false}
                helperText={error[0] && error[0].isError && error[0].errorMessage}
                aria-activedescendant=""
                onChange={(e: any) => isSubmitted ? handleClearInput(e.target.value, 0) : handleSetValue(e.target.value, 0)}
                value={isSubmitted ? formattedInput[0] : multiInput[0]}
                onKeyPress={(ev: any) => {
                    if (ev.key === "Enter") {
                        ev.preventDefault();
                        handleSubmit(false);
                    }
                }}
                onBlur={() => isRangeInput ? '' : handleSubmit(false)}
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
                        inputRef={input2Ref}
                        fontcolor={fontColor}
                        width={width}
                        dir={type === 'amount' ? 'rtl' : 'ltr'}
                        fontsize={fontSize}
                        bordercolor={borderColor}
                        backgroundcolor={backgroundColor}
                        variant={border}
                        error={error[1] && error[1].isError ? true : false}
                        helperText={error[1] && error[1].isError && error[1].errorMessage}
                        onChange={(e: any) => isSubmitted ? handleClearInput(e.target.value, 1) : handleSetValue(e.target.value, 1)}
                        value={isSubmitted ? formattedInput[1] : multiInput[1]}
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
        {/* {formattedInput.length > 0 && !error[0].isError && !error[1].isError && (
            <StyledValueContainer fontSize={fontSize}>
                {formattedInput.length > 1 ? `${formattedInput.join(' To ')}` : formattedInput}
            </StyledValueContainer>
        )} */}
    </Box>;
};

export default NumberInput;