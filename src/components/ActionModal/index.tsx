import React, { ReactElement } from "react";
import { Modal, Typography, Stack } from "@mui/material";

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
    width = '500',
    handleClose
}: ModalProps) => {
    return (
        // TODO: add onclose toggle if required.
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Stack
                bgcolor={backgroundColor} sx={{
                padding: '15px',
                maxWidth: `${width}px`,
                margin: 'auto'
            }}>
                <Typography variant="h5" textAlign='center' >
                    {title}
                </Typography>
                {children}
            </Stack>
        </Modal>);
};

export default ActionModal;