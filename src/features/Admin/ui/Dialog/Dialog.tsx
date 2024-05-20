import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface DialogProps {
    isOpenDialog: boolean
    setIsOpenDialog: Dispatch<SetStateAction<boolean>>
    title: string
    content: ReactNode
    actions?: ReactNode
}

export const AdminDialog = (props: DialogProps) => {
    const { isOpenDialog, setIsOpenDialog, title, content, actions } = props
    return (
        <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
            <DialogTitle>{title}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setIsOpenDialog(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ minWidth: 200 }}>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    )
}
