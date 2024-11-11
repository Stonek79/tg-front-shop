import { ChangeEventHandler } from 'react'
import { Box } from '@mui/material'
import * as React from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

interface DropdownImageInputProps {
    source: string
    multiple?: boolean
    placeholder?: string
    onChangeEvent?: ChangeEventHandler<HTMLInputElement> | undefined
    disabled?: boolean
}

export const DropdownImageInput = ({
    source,
    placeholder,
    onChangeEvent,
    multiple = false,
    disabled = false,
}: DropdownImageInputProps) => {
    const { t } = getTranslation()
    return (
        <Box
            role="presentation"
            sx={{
                borderRadius: 2,
                p: 1,
                alignSelf: 'center',
                width: 'fit-content',
                textAlign: 'center',
                background: '#cdcdd5',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.2 : 1,
            }}
        >
            <label
                htmlFor={source}
                style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    width: '100%',
                    display: 'block',
                    padding: '8px',
                }}
            >
                {placeholder || t('product.addImage')}
            </label>
            <input
                id={source}
                disabled={disabled}
                name="file"
                style={{
                    display: 'none',
                }}
                type="file"
                accept="image/*"
                onChange={onChangeEvent}
                multiple={multiple}
            />
        </Box>
    )
}
