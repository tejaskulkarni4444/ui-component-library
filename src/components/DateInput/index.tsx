import React, { useState } from 'react'
import styled from 'styled-components'
import { validDateRegEx } from '../../utils/helpers'
import TextInput, { TError, TextInputProps } from '../TextInput'
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

    const [displayValue, setDisplayValue] = useState<Array<string>>([]);
    const [error, setError] = useState<Array<TError>>(defaultErrorState);

    //
    // validates the submitted values before returning
    //
    const handleValue = (valueArray: Array<string>) => {
        if (isRangeInput && valueArray.length > 0) {
            for (let i = 0; i < valueArray.length; i++) {
                let validation = handleValidation(valueArray[i], i);
                // if(validation === false) break;
            }
            // valueArray.map((val: string, index) => {
            //     handleValidation(val, index)
            // })
        } else {
            handleValidation(valueArray[0])
        }
        return displayValue
    }

    const handleValidation = (value: string, index = 0) => {
        let formattedDate = '';
        let hasError = '';
        let errorState = error; //Error state holder
        // Trim input value to remove empty spaces if any
        let trimmedValue = value.replace(/\s/g, "");

        // if (value === displayValue) return;
        if (!value) {
            errorState[index] = {
                isError: true,
                errorMessage: value === '' ? 'Date cannot be empty' : 'Invalid Input',
                index: index
            }
            setError([...errorState])
            return false;
        }

        //
        // return false for invalid inputs
        //
        if (
            !trimmedValue ||
            trimmedValue === "" ||
            trimmedValue.length < 6 ||
            trimmedValue.length > 8
        ) {
            hasError = "Invalid date or format.";
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
                hasError = "Invalid date!"
            }
        } else {
            formattedDate = ''
        }

        //
        // Check if data is empty or has error
        //
        if (formattedDate === '' || hasError.includes('Invalid')) {
            errorState[index] = {
                isError: true,
                errorMessage: hasError ? hasError : 'Invalid Date',
                index
            }
            setError([...errorState])
            return false;
        } else {
            // Return error if error is present in value
            if (Object.entries(error).length > 0) {
                errorState[index].isError = false
                errorState[index].errorMessage = ''
                setError([...errorState])
            }

            let tempDateHolder = displayValue;
            tempDateHolder[index] = formattedDate
            setDisplayValue([...tempDateHolder])
            return true;
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
                isRangeInput={isRangeInput}
                error={error}
            />
            {displayValue && !error[0].isError && !error[1].isError && (
                <StyledValueContainer fontSize={fontSize}>
                    {isRangeInput ? displayValue.join(' To ') : displayValue.join('')}
                </StyledValueContainer>
            )}
        </StyleldDivContainer>
    )
}
