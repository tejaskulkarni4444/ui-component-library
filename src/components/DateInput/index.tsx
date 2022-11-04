import React, { useEffect, useState } from 'react'
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
  export const defaultErrorState = [
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

  export default function DateInput({
    isRangeInput = false,
    border = 'standard',
    fontSize = '16px',
    label = 'Date label',
    fontColor = '#000000',
    clearInput = false,
    minChars = 6,
    maxChars = 8
}: IDateInputProps) {

    const [displayValue, setDisplayValue] = useState<Array<string>>([]);
    const [error, setError] = useState<Array<TError>>(defaultErrorState);
    const defaultDate = `0104${new Date().getFullYear()}` // Default date value if input is empty

    useEffect(() => {
        setDisplayValue([])
    }, [clearInput])

    //
    // validates the submitted values before returning
    //
    const handleValue = (valueArray: Array<string>) => {
        if (isRangeInput && valueArray.length > 0) {
            for (let i = 0; i < valueArray.length; i++) {
                let validation = handleValidation(valueArray[i], i);
                // if(validation === false) break;
            }
        } else {
            handleValidation(valueArray[0])
        }
        return displayValue
    }

    const handleValidation = (currentValue: string, index = 0) => {
        let formattedDate = '';
        let hasError = '';
        let errorState = error; //Error state holder
        // Trim input value to remove empty spaces if any
        let trimmedValue = currentValue.replace(/\s/g, "");

        console.log(currentValue)
        if ((!currentValue || currentValue === '') && defaultDate) {
            console.log('first')
            trimmedValue = defaultDate
        }

        // 
        // if the submitted input is less than min characters accepted.
        // 
        if (minChars && trimmedValue.length < minChars) {
            errorState[index] = {
                isError: true,
                errorMessage: `Minimum Date length should be ${minChars}`,
                index: index
            }
            setError([...errorState])
            return false;
        }

        //
        // if input length = 4 add 01 as date to the input 
        //
        if (
            trimmedValue && trimmedValue.length === 4
        ) {
            trimmedValue = `01${trimmedValue}`
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
                + trimmedValue.slice(trimmedValue.length - 2);

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

            // Conver dates into time stamp for comparison
            const d1 = new Date(tempDateHolder[0])
            const d2 = new Date(tempDateHolder[1])
            const dateTimeStamp = new Date(formattedDate) 
            const currentDate = new Date();

            if (dateTimeStamp > currentDate) {
                errorState[index] = {
                    isError: true,
                    errorMessage: 'Date must be less than or equal to present date!',
                    index
                }
                setError([...errorState])
                return false;
            }

            //
            // check if first date is greater than second date
            //
            if (d1 > d2) {
                errorState[1] = {
                    isError: true,
                    errorMessage: 'Second date should be greater than first date!',
                    index: 1
                }
                setError([...errorState])
                return false;
            }

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
                // TODO: fix type warning
                // @ts-ignore
                handleReturnValue={handleValue}
                isRangeInput={isRangeInput}
                error={error}
                clearInput={clearInput}
                maxChars={maxChars}
            />
            {displayValue && !error[0].isError && !error[1].isError && (
                <StyledValueContainer fontSize={fontSize}>
                    {isRangeInput ? displayValue.join(' To ') : displayValue.join('')}
                </StyledValueContainer>
            )}
        </StyleldDivContainer>
    )
}
