import { Avatar, Box, Paper } from '@mui/material'
import { Color, Size } from '@/types/product'
import { memo } from 'react'
import * as React from 'react'
import { apiUrl } from '@/shared/lib/actions/dataProviders'

type SelectInputFieldWrapperProps = {
    value: Size | Color
    type: string
}

export const SelectInputFieldWrapper = memo(function SelectInputFieldWrapper({
    value,
    type,
}: SelectInputFieldWrapperProps) {
    return (
        <Paper
            elevation={1}
            sx={{
                width: 'fit-content',
                minWidth: '50px',
                px: 0.5,
                py: 0.2,
                border: `3px solid ${type === 'color' ? (value as Color).color : 'black'}`,
                margin: '5px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                {type === 'size' ? <span>{value.name}</span> : null}
                {type === 'color' && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 0,
                            }}
                            src={
                                (value as Color)?.image?.src ??
                                `${apiUrl}/images/${(value as Color)?.image}`
                            }
                        />
                    </Box>
                )}
            </Box>
        </Paper>
    )
})
