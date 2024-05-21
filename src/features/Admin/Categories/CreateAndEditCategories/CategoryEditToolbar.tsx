import { useState } from 'react'
import { Button, Confirm, SaveButton, Toolbar } from 'react-admin'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

export const CategoryEditToolbar = ({
    labels,
    name,
    onSave,
    onDelete,
}: {
    labels: {
        [key: string]: string
    }
    id: number
    name: string
    onSave: () => void
    onDelete: () => void
}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(true)
    const handleDialogClose = () => setOpen(false)
    const handleConfirm = () => {
        onDelete()
        setOpen(false)
    }
    return (
        <Toolbar
            sx={{
                justifyContent: 'space-between',
                '&.MuiToolbar-root': { p: 1, minHeight: 'auto' },
            }}
        >
            <SaveButton
                size="small"
                type="button"
                label={labels.save}
                name={labels.save}
                onClick={onSave}
            />
            <Button
                color="error"
                startIcon={<DeleteIcon />}
                label="Delete"
                onClick={handleClick}
            />
            <Confirm
                isOpen={open}
                title={`${labels.confirmDeleteTitle} ${name.toUpperCase()}`}
                content={labels.confirmDeleteContent}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
                confirmColor="warning"
            />
        </Toolbar>
    )
}
