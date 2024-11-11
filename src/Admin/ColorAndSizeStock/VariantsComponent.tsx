import { ColorAndSizeStock, Image } from '@/types/product'
import { Avatar, Box, Card, InputAdornment, Paper } from '@mui/material'
import { colors } from '@/shared/consts/colors'
import { memo } from 'react'
import { apiUrl } from '@/shared/lib/actions/dataProviders'
import { useFormContext } from 'react-hook-form'
import { useCustomWatch } from '@/shared/lib/hooks/useCustomWatch'
import * as React from 'react'
import { NumberInput } from 'react-admin'

// eslint-disable-next-line react/display-name
const SelectedColor = memo(({ variant }: { variant: ColorAndSizeStock }) => (
    <Box>
        <Paper
            elevation={1}
            sx={{
                width: 'fit-content',
                minWidth: 'fit-content',
                border: `3px solid ${colors[variant?.color]}`,
            }}
        >
            <Avatar
                sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 0,
                }}
                src={
                    (variant?.image as Image)?.src ??
                    `${apiUrl}/images/${variant?.image}`
                }
            />
        </Paper>
    </Box>
))

// eslint-disable-next-line react/display-name
const SelectedSize = memo(({ variant }: { variant: ColorAndSizeStock }) => (
    <Box sx={{ alignSelf: 'center' }}>
        <Box sx={{ minWidth: '40px' }}>{variant.size}</Box>
    </Box>
))

// eslint-disable-next-line react/display-name
const ColorAndSizeQuantityInput = memo(({ index }: { index: number }) => {
    const { setValue } = useFormContext()
    const num = useCustomWatch({
        name: `colorAndSizeStock.${index}.quantityInStock`,
    })

    return (
        <NumberInput
            required
            value={num}
            label={false}
            source={`colorAndSizeStock.${index}.quantityInStock`}
            onChange={(e) => {
                setValue(
                    `colorAndSizeStock.${index}.quantityInStock`,
                    +e.target.value,
                )
            }}
            min={0}
            max={100}
            variant="standard"
            helperText={false}
            defaultValue={num}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">шт</InputAdornment>
                ),
            }}
            sx={{
                flexGrow: 1,
                width: '70px',
                mr: 0.5,
                mt: 0,
                mb: 0,
            }}
        />
    )
})

const SelectInputField = ({
    variant,
    index,
}: {
    variant: ColorAndSizeStock
    index: number
}) => (
    <Card key={index} sx={{ display: 'flex', gap: 0.5 }}>
        <SelectedColor variant={variant} />
        <SelectedSize variant={variant} />
        <ColorAndSizeQuantityInput index={index} />
    </Card>
)

// eslint-disable-next-line react/display-name
export const VariantsComponent = memo(
    ({ variants }: { variants: ColorAndSizeStock[] }) => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {variants.map((variant, index) => (
                <Box
                    sx={{
                        border: '1px solid black',
                        borderRadius: '5px',
                    }}
                    key={index}
                >
                    <SelectInputField variant={variant} index={index} />
                </Box>
            ))}
        </Box>
    ),
)
