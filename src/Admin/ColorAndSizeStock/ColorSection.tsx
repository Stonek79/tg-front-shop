import { memo, useMemo, useState } from 'react'
import type { SingleColor } from '@/types/product'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Box, Chip } from '@mui/material'
import { ColorSelectorComponent } from './ColorSelectorComponent'
import { SelectInputFieldWrapper } from './SelectInputFieldWrapper'
import { AdminDialog } from '@/Admin/ui'
import { Button } from 'react-admin'
import { colors } from '@/shared/consts/colors'
import { PreparedColors } from '@/types/product'

const prepareColors = (
    t: (key: string) => string,
    selectedColors: SingleColor[],
): PreparedColors[] =>
    selectedColors.map(({ color, image }) => ({
        id: color,
        name: t(`colors.${color}`),
        color: colors[color],
        image,
    }))

// eslint-disable-next-line react/display-name
export const ColorSection = memo(
    ({
        selectedColors,
        setSelectedColors,
        remove,
    }: {
        selectedColors: SingleColor[]
        setSelectedColors: (colors: SingleColor) => void
        remove: (color: string) => void
    }) => {
        const { t } = getTranslation()
        const [value, setValue] = useState<PreparedColors>(null)
        const [open, setOpen] = useState(false)

        const handleDelete = (image: PreparedColors) => {
            setSelectedColors(image)
            remove(image.id)
            setOpen(false)
        }

        const preparedColors = useMemo(
            () => prepareColors(t, selectedColors),
            [t, selectedColors],
        )

        return (
            <Box>
                <ColorSelectorComponent
                    selectedColors={selectedColors}
                    setColor={setSelectedColors}
                />
                <Box sx={{ display: 'flex', p: 2, flexWrap: 'wrap' }}>
                    {preparedColors.map((value) => (
                        <Chip
                            key={value.id}
                            label={
                                <SelectInputFieldWrapper
                                    value={value}
                                    type={'color'}
                                />
                            }
                            variant="outlined"
                            onDelete={() => {
                                setOpen(true)
                                setValue(value)
                            }}
                            sx={{
                                borderRadius: 0,
                                border: 'none',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                    padding: 0,
                                },
                                '& .MuiSvgIcon-root': {
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-10px',
                                },
                            }}
                        />
                    ))}
                </Box>
                <AdminDialog
                    title={`${t('adminColorsAndSizes.deleteColor')} "${
                        preparedColors.find((item) => item.id === value?.id)
                            ?.name
                    }"`}
                    isOpenDialog={open}
                    setIsOpenDialog={setOpen}
                    content={
                        <span>
                            {`${t('adminColorsAndSizes.confirmDeleteTitle')} "${
                                preparedColors.find(
                                    (item) => item.id === value?.id,
                                )?.name
                            }"`}
                        </span>
                    }
                    actions={
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                color="error"
                                onClick={() => handleDelete(value)}
                            >
                                <span>{t('buttons.yes')}</span>
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                <span>{t('buttons.no')}</span>
                            </Button>
                        </Box>
                    }
                />
            </Box>
        )
    },
)
