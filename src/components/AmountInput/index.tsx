import React from "react";
import { Box, FormControl, Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export interface AmountInputProps {
    label: string;
    fontSize: number | string;
    width: number | string;
    placeholder: string;
    font: string,
    backgroundColor?: string,
    border?: string,
    className?: string,
    effects?: string
}

const AmountInput = (props: AmountInputProps) => {

    /////////////////////
    //      handler    //
    /////////////////////

    //
    // Returns integer with comma according to indian rupee system
    //
    const handleIntergerMasking = (value: number) => {
        //
        // Converting current value to string
        //
        const tempVal = value.toString();

        //
        // Getting the last 3 digits and remaining digits into variables
        //
        let lastThree = tempVal.substring(tempVal.length - 3);
        let otherNumbers = tempVal.substring(0, tempVal.length - 3);

        //
        // Check if rest of the digits are not empty or null
        //
        if (otherNumbers != '')
            lastThree = ',' + lastThree;

        //
        // Add comma to to first (value.length - 3) digits after every 2 digits then 
        // Join the first remaining numbers with last three numbers with a ','
        //
        const transformedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        console.log(transformedInteger)
    }

    return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography
            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            fontSize={props.fontSize}
        >
            {props.label}
        </Typography>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
                id="input-with-sx"
                placeholder={props.placeholder}
                className=""
                aria-activedescendant=""
                onChange={(e: any) => handleIntergerMasking(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    </Box>;
};

export default AmountInput;