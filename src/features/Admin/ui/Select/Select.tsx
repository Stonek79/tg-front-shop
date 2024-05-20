import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import {
    Box,
    FormHelperText,
    InputAdornment,
    Paper,
    Badge,
    Typography,
} from '@mui/material'
import { ChangeEvent, memo, useState } from 'react'
import { NumberInput } from 'react-admin'
import { Button } from '@/shared/ui/Button'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { AdminDialog } from '@/features/Admin/ui/Dialog'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

type Direction = 'row' | 'column'

interface MultipleSelectProps {
    tag: string
    items: string[]
    colors?: object
    hasQuantity?: boolean
    required?: boolean
    direction?: Direction
    formWidth?: number | string
}

// eslint-disable-next-line react/display-name
export const MultipleSelect = memo((props: MultipleSelectProps) => {
    const {
        tag = '',
        items = [],
        colors,
        hasQuantity = false,
        required = false,
        direction = 'column',
        formWidth = 300,
    } = props

    const { t } = getTranslation()
    const [selectedItems, setSelectedItems] = React.useState<string[]>([])
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [currentItem, setCurrentItem] = useState('')
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuantities = {
            ...quantities,
            [currentItem]: +event.target.value,
        }

        setQuantities(newQuantities)
    }

    const handleDeleteQuantity = (item: string) => {
        const temp: {
            [key: string]: number
        } = Object.assign({}, quantities)
        delete temp[item]
        setQuantities(temp)
    }
    const handleChangeSelect = (
        event: SelectChangeEvent<typeof selectedItems>,
    ) => {
        const {
            target: { value },
        } = event

        if (!value.length && selectedItems.length) {
            setSelectedItems(selectedItems)
        } else if (!selectedItems.includes(value[value.length - 1])) {
            setSelectedItems(
                typeof value === 'string' ? value.split(',') : value,
            )
        }
    }

    const dialogTitle = hasQuantity ? t('buttons.edit') : t('buttons.delete')
    const dialogContent = hasQuantity ? (
        <NumberInput
            source={t('products.quantity') as string}
            name={'quantity'}
            step={1}
            onChange={handleQuantityChange}
            defaultValue={1}
            value={quantities[currentItem] || 1}
            inputProps={{ value: quantities[currentItem] || 1 }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        {t('products.grand')}
                    </InputAdornment>
                ),
            }}
        />
    ) : (
        <Typography sx={{ color: 'red', textAlign: 'center' }}>
            {`${t('buttons.delete')} ${currentItem}?`}
        </Typography>
    )

    const dialogActions = (
        <Box sx={{ gap: '8px', display: 'flex' }}>
            <div>
                {hasQuantity && (
                    <Button
                        onClick={() => {
                            const currentQuantity = quantities[currentItem] || 1
                            setQuantities({
                                ...quantities,
                                [currentItem]: currentQuantity,
                            })
                            setIsOpenDialog(false)
                        }}
                    >
                        {t('buttons.save')}
                    </Button>
                )}
            </div>
            <div>
                {
                    <Button
                        variant="alert"
                        onClick={() => {
                            hasQuantity && handleDeleteQuantity(currentItem)
                            setSelectedItems(
                                selectedItems.filter((i) => i !== currentItem),
                            )
                            setIsOpenDialog(false)
                        }}
                    >
                        {t('buttons.delete')}
                    </Button>
                }
            </div>
        </Box>
    )

    return (
        <>
            <FormControl sx={{ width: formWidth }}>
                <InputLabel size="normal" id="multiple-checkbox-label">
                    {tag}
                </InputLabel>
                <Select
                    required={required}
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={selectedItems}
                    onChange={handleChangeSelect}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {items.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            onClick={() => {
                                setCurrentItem(name)

                                if (
                                    hasQuantity ||
                                    (name && selectedItems.includes(name))
                                ) {
                                    setIsOpenDialog(true)
                                    hasQuantity &&
                                        !selectedItems.includes(name) &&
                                        setQuantities({
                                            ...quantities,
                                            [name]: 1,
                                        })
                                }
                            }}
                        >
                            <Checkbox
                                checked={selectedItems.indexOf(name) > -1}
                            />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText />
                <Box
                    sx={{
                        display: 'flex',
                        gap: hasQuantity ? 2 : 1,
                        flexWrap: 'wrap',
                        mt: hasQuantity ? 1 : 0,
                        direction: direction,
                    }}
                >
                    {selectedItems?.map((it, i) => (
                        <Badge
                            color="secondary"
                            invisible={!hasQuantity && !quantities[it]}
                            badgeContent={quantities[it]}
                            key={i}
                        >
                            <Paper
                                elevation={1}
                                sx={{
                                    px: 0.5,
                                    py: 0.2,
                                    cursor: 'pointer',
                                    border: `2px solid ${colors ? (colors as Record<string, string>)[it] : 'black'}`,
                                }}
                                onClick={() => {
                                    setIsOpenDialog(true)
                                    setCurrentItem(it)
                                }}
                            >
                                {it}
                            </Paper>
                        </Badge>
                    ))}
                </Box>
            </FormControl>

            <AdminDialog
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                content={dialogContent}
                title={dialogTitle as string}
                actions={dialogActions}
            />
        </>
    )
})
