import { formatMuiErrorMessage } from '@mui/utils'
import React, { useState } from 'react'
import styled from 'styled-components'
import { validDateRegEx } from '../../utils/helpers'
import TextInput, { TextInputProps } from '../TextInput'
import { TBorder } from '../TextInputWithSearch'

interface IDateInputProps extends TextInputProps {
    isRangeInput?: boolean,
    border?: TBorder,
    fontSize?: string,
}

const StyleldDivContainer = styled.div`
  display: flex;
  align-items: center
`

export const StyledValueContainer = styled.p<{ fontSize: any }>`
  display: flex;
  align-items: center;
  font-size: ${(props: any) => props.fontSize};
  font-weight: 600
`

export default function DateInput({
    isRangeInput = false,
    border = 'standard',
    fontSize = '16px',
    label = 'Date label',
    fontColor = '#000000'
}: IDateInputProps) {
    const defaultErrorState = {
        isError: false,
        errorMessage: ''
    }

    const [displayValue, setDisplayValue] = useState("");
    const [error, setError] = useState(defaultErrorState);

    const handleValue = async (value: string) => {
        if (value === displayValue) return;
        if (!value) {
            setError({
                isError: true,
                errorMessage: 'Invalid Input'
            })
            return;
        }

        let formattedDate: string;
        // Trim input value to remove empty spaces if any
        let trimmedValue = value.replace(/\s/g, "");

        //
        // return false for invalid inputs
        //
        if (
            !trimmedValue ||
            trimmedValue === "" ||
            trimmedValue.length < 6 ||
            trimmedValue.length > 8
        ) {
            formattedDate = "Invalid date or format.";
        }

        //
        // if input does not contain spearators like / or - or .
        //
        if (trimmedValue.length === 6 || trimmedValue.length === 8) {
            formattedDate = trimmedValue.slice(0, 2) + '/' + trimmedValue.slice(2, 4) + '/20'
                + trimmedValue.slice(trimmedValue.length - 2);;

            //
            // Check if date month and year are valid
            //

            let regexTest = validDateRegEx.test(formattedDate);
            if (!regexTest) {
                formattedDate = "Invalid date!"
            }
        } else {
            formattedDate = ''
        }

        if (formattedDate === '' || formattedDate.includes('Invalid')) {
            const err = {
                isError: true,
                errorMessage: formattedDate ? formattedDate : 'Invalid Date'
            }
            setError({ ...err })
            return false;
        } else {
            if (error.isError) setError({ ...defaultErrorState })
            setDisplayValue(formattedDate)
        }
    }

    return (
        <StyleldDivContainer>
            <TextInput
                label={label}
                placeholder='Enter date'
                border={border}
                width='200px'
                fontSize={fontSize}
                fontColor={fontColor}
                handleReturnValue={handleValue}
                error={error}
            />
            {displayValue && (
                <StyledValueContainer fontSize={fontSize}>
                    {displayValue}
                </StyledValueContainer>
            )}
        </StyleldDivContainer>

    )
}
