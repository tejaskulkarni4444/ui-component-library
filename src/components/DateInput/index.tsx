import React from 'react'
import { handleDateValidation } from '../../utils/helpers'
import TextInput from '../TextInput'
import { TBorder } from '../TextInputWithSearch'

interface IDateInputProps {
    isRangeInput?: boolean,
    border?: TBorder
}

export default function DateInput({
    isRangeInput = false,
    border = 'standard'
}: IDateInputProps) {

    const handleValue = (value: string) => {
        console.log(value)
        handleDateValidation(value)
    }

    return (
        <div>
            <TextInput
                label='Date'
                placeholder='Enter date'
                border={border}
                width='200px'
                handleReturnValue={handleValue}
            />
        </div>
    )
}
