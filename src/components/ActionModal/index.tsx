import React, { ReactElement } from "react";
import { Modal, Typography, Stack, Box } from "@mui/material";

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
            <Stack
                bgcolor={backgroundColor} sx={{
                padding: '15px',
                maxWidth: `${width}px`,
                margin: 'auto',
                borderRadius: '10px',
                outline: 0,
            }}>
                <Box display='flex' justifyContent='end'>
                    <span>x</span>
                </Box>
                <Typography variant="h5" textAlign='center' >
                    {title}
                </Typography>
                {children}
            </Stack>
        </Modal>);
};

export default ActionModal;