import React, { useState } from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { handleIntergerMasking } from "../../utils/helpers";
import { TBorder } from "../TextInputWithSearch";

type TInputType = 'integer' | 'decimal' | 'decimalMasking' | 'amount'
export type IReturnValueCallback = (value: string) => void;


export interface NumberInputProps {
    label: string;
    fontSize: number | string;
    width: number | string;
    placeholder: string;
    font: string,
    backgroundColor?: string,
    border?: TBorder,
    className?: string,
    effects?: string,
    type?: TInputType,
    hideLabel?: boolean,
    handleReturnValue: IReturnValueCallback
}

const NumberInput = ({
    fontSize,
    label,
    placeholder,
    type = 'integer',
    className,
    handleReturnValue,
    width = '300px',
    border = 'standard',
    hideLabel = false
}: NumberInputProps) => {

    ////////////////////////////
    //        States          //
    ////////////////////////////

    const [inputValue, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    /////////////////////
    //      handler    //
    /////////////////////

    const hanldeSetValue = (val: string) => {
        //
        // if input type is integer
        //
        if (type === 'integer') {
            if (val.includes('.') || val.includes(',')) {
                setErrorMessage('Invalid input')
            } else {
                setErrorMessage('')
            }
            setInputValue(val)
            return;
        }

        //
        // Separate numbers before and after decimal
        //
        let numbersBeforeDecimal = val.split('.')[0]
        let numbersAfterDecimal = val.split('.')[1]
        // @ts-ignore
        let formattedInput = handleIntergerMasking(numbersBeforeDecimal.replaceAll(',', ''))

        if (numbersAfterDecimal !== undefined) {
            setInputValue(`${formattedInput}.${numbersAfterDecimal.slice(0, 2)}`)
        } else {
            setInputValue(formattedInput)
        }
        setErrorMessage('')
    }

    const handleSubmit = () => {
        //
        // return error if value is empty
        //
        if (inputValue === '') {
            setErrorMessage('Empty input not allowed')
            return false;
        }

        //
        // return input value via callback
        //        
        if (!errorMessage && inputValue) {
            handleReturnValue(inputValue)
        }
    }

    return <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <Typography
            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            fontSize={fontSize}
        >
            {label}
        </Typography>
        <FormControl
            sx={{ m: 1, width: width }}
            variant="standard"
            error={errorMessage ? true : false}
        >
            <TextField
                id="input-with-sx"
                placeholder={placeholder}
                type='text'
                className={className}
                variant={border}
                error={errorMessage ? true : false}
                helperText={errorMessage && errorMessage}
                aria-activedescendant=""
                onChange={(e: any) => hanldeSetValue(e.target.value)}
                value={inputValue}
                onKeyPress={(ev: any) => {
                    if (ev.key === "Enter") {
                        ev.preventDefault();
                        handleSubmit();
                    }
                }}
            />
        </FormControl>
    </Box>;
};

export default NumberInput;