import React, { ReactElement } from "react";
import { Modal, Stack, Box } from "@mui/material";
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

const StyledCloseTypography = styled.p`
    font-weight: 500 !important;
    font-family: 'Arial' !important;
    cursor: pointer !important;
    font-size: 15px !important;
    border-radius: 50% !important;
    width: 20px;
    background-color: lightgrey !important;
    margin: 0;
    text-align: center;
    height: 20px;
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
                width={`${width}px`}
                bgcolor={backgroundColor}
            >
                <Box display='flex' justifyContent='end'>
                    <StyledCloseTypography onClick={handleClose}>x</StyledCloseTypography>
                </Box>
                <h3 style={{ textAlign: 'center', margin: '10px auto' }} >
                    {title}
                </h3>
                {children}
            </StyledStack>
        </Modal>);
};

export default ActionModal;