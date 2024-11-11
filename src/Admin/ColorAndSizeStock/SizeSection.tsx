import { memo, useState } from 'react'
import { Size } from '@/types/product'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Box, Chip } from '@mui/material'
import { AdminDialog } from '@/Admin/ui'
import { Button } from 'react-admin'
import { SelectInputFieldWrapper } from './SelectInputFieldWrapper'
import { SizeSelectorComponent } from './SizeSelectorComponent'

export // eslint-disable-next-line react/display-name
const SizeSection = memo(
    ({
        selectedSizes,
        setSelectedSizes,
        remove,
    }: {
        selectedSizes: Size[]
        setSelectedSizes: (sizes: Size) => void
        remove: (size: string) => void
    }) => {
        const { t } = getTranslation()
        const [value, setValue] = useState('')
        const [open, setOpen] = useState(false)

        const handleDelete = (size: string) => {
            setSelectedSizes({ name: size })
            remove(size)
            setOpen(false)
        }

        return (
            <Box>
                <SizeSelectorComponent
                    sizes={selectedSizes}
                    setSize={setSelectedSizes}
                />
                <Box sx={{ display: 'flex', p: 2, flexWrap: 'wrap' }}>
                    {selectedSizes.map((value, index) => (
                        <Chip
                            key={value.name + index}
                            label={
                                <SelectInputFieldWrapper
                                    value={value}
                                    type={'size'}
                                />
                            }
                            variant="outlined"
                            onDelete={() => {
                                setOpen(true)
                                setValue(value.name)
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
                                    top: '-10px',
                                    right: '-10px',
                                },
                            }}
                        />
                    ))}
                </Box>
                <AdminDialog
                    title={`${t('adminColorsAndSizes.deleteSize')} "${value}"`}
                    isOpenDialog={open}
                    setIsOpenDialog={setOpen}
                    content={
                        <span>
                            {`${t('adminColorsAndSizes.confirmDeleteTitle')} "${value}"`}
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
