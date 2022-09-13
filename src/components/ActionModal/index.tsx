import React, { ReactElement } from "react";
import { Modal, Typography, Stack, Box } from "@mui/material";
//@ts-ignore
import styled from "styled-components";

interface CallbackType { (): void }

export interface ModalProps {
    title?: string;
    width?: string;
    font?: string,
    backgroundColor?: string,
    border?: string,
    className?: string,
    open: boolean,
    children: ReactElement,
    handleClose: CallbackType
}

////////////////////////////
//   Styled components    //
////////////////////////////

const StyledCloseTypography = styled(Typography)`
    font-weight: 500 !important;
    font-family: 'Arial' !important;
    cursor: pointer !important;
    font-size: 15px !important;
    border-radius: 50% !important;
    padding: 0px 6px !important;
    background-color: lightgrey !important;
    margin-bottom: 0;
`

const StyledStack = styled(Stack)`
    padding: 15px;
    max-width: ${(props: any) => props.width}px;
    margin: auto;
    borderRadius: 10px;
    outline: 0;
    background-color: ${(props: any) => props.bgcolor};
    height: 100%;
`

const ActionModal = ({
    open,
    title = 'Modal title',
    children,
    backgroundColor = '#ffffff',
    width = '600',
    handleClose
}: ModalProps) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                top: '10%',
                maxHeight: '500px'
            }}
        >
            <StyledStack
                width={width}
                bgcolor={backgroundColor}
            >
                <Box display='flex' justifyContent='end'>
                    <StyledCloseTypography onClick={handleClose}>x</StyledCloseTypography>
                </Box>
                <Typography variant="h5" textAlign='center' >
                    {title}
                </Typography>
                {children}
            </StyledStack>
        </Modal>);
};

export default ActionModal;