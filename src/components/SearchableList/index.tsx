import React, { useState } from "react";
import {
    Button,
    Container,
    FormControlLabel,
    List,
    ListItem,
    Box,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

////////////////////
//      Types     //
///////////////////

interface CallbackType {
    (list: string[]): void;
}
interface SearchableListProps {
    returnSelectedOptions: CallbackType;
    multipleSelection: boolean;
}

///////////////////////////
//   Styled component   //
//////////////////////////

const StyledList = styled(List)(() => ({
    height: "300px",
    overflowY: "auto",
    margin: "10px auto",
    ".MuiListItem-root": {
        border: "solid 1px lightgrey",
    },
    ".MuiListItem-root:nth-of-type(even)": {
        backgroundColor: "#f6f9fc",
    },
}));

export default function SearchableList({
    returnSelectedOptions,
    multipleSelection,
}: SearchableListProps) {
    ////////////////////
    //     states     //
    ///////////////////

    const [selectionList, setSelectionList] = useState<string[]>([]);

    const data = [
        {
            id: "1",
            name: "Retired",
            city: "London",
        },
        {
            id: "2",
            name: "Doctor",
            city: "Madrid",
        },
        {
            id: "3",
            name: "Architect",
            city: "Paris",
        },
        {
            id: "4",
            name: "Engineer",
            city: "Alabama",
        },
        {
            id: "5",
            name: "Business",
            city: "Nashik",
        },
        {
            id: "6",
            name: "Student",
            city: "NY",
        },
        {
            id: "7",
            name: "Service",
            city: "Alabama",
        },
        {
            id: "8",
            name: "Teacher",
            city: "Alabama",
        },
        {
            id: "9",
            name: "Teller",
            city: "Mumbai",
        },
    ];

    //////////////////////////////////
    //    update selection list    //
    /////////////////////////////////

    const handleSelection = (selectedOption: string) => {
        if (selectedOption) {
            //
            // Check if list is multiple selection or single selection
            //
            if (multipleSelection) {
                handleMultipleSelection(selectedOption);
            } else {
                setSelectionList([selectedOption]);
            }
        }
    };

    const handleMultipleSelection = (selectedOption: string) => {
        let tempList: Array<string> = selectionList;
        //
        // Check if currently selected option already exists in the list
        //
        if (selectedOption && selectionList.includes(selectedOption)) {
            tempList = tempList.filter((item: string) => item !== selectedOption);
        } else {
            tempList.push(selectedOption);
        }
        setSelectionList([...tempList]);
    };

    /**
     * Add styled list alternate color
     * set max height
     * Add a close button?
     *
     */
    return (
        <Container>
            <StyledList>
                {data.map((item: any) => {
                    const isChecked: boolean = selectionList.includes(item.name)
                        ? true
                        : false;

                    return (
                        <ListItem key={item.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onClick={() => handleSelection(item.name)}
                                        sx={{
                                            padding: "5px",
                                        }}
                                    />
                                }
                                label={item.name}
                            />
                        </ListItem>
                    );
                })}
            </StyledList>
            <Box display="flex" justifyContent="flex-end" marginTop={"15px"}>
                <Button
                    onClick={() => returnSelectedOptions(selectionList)}
                    variant="contained"
                    sx={{
                        fontWeight: 600
                    }}
                >
                    Done
                </Button>
            </Box>
        </Container>
    );
}
