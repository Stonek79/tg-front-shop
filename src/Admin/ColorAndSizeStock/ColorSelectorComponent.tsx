import { Button, SelectInput } from 'react-admin'
import { Box, Card, Dialog, DialogActions, DialogContent } from '@mui/material'
import { colors } from '@/shared/consts/colors'
import { useForm, FormProvider } from 'react-hook-form'
import { SingleColor } from '@/types/product'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { memo, useState } from 'react'
import { CustomImageInput } from '@/Admin/ui'

const transformedColors = Object.keys(colors).map((choice) => ({
    id: choice,
    name: choice,
}))

// eslint-disable-next-line react/display-name
export const ColorSelectorComponent = memo(
    ({
        selectedColors,
        setColor,
    }: {
        selectedColors: SingleColor[]
        setColor: (color: SingleColor) => void
    }) => {
        const { t } = getTranslation()
        const [open, setOpen] = useState(false)
        const [colorName, setColorName] = useState<string | undefined>()
        const [hasError, setHasError] = useState<boolean>(false)
        const methods = useForm<SingleColor>({ mode: 'onChange' })
        const { getValues, reset, setError } = methods

        const onCancel = () => {
            setOpen(false)
            setColorName(undefined)
            reset()
        }

        const handleAddColor = () => {
            if (!getValues().color) {
                return setError('color', {
                    message: t('errors.colorRequired'),
                })
            }

            if (!getValues().image) {
                return setError('image', {
                    message: t('errors.imageColorRequired'),
                })
            }

            setColor(getValues())
            onCancel()
        }

        return (
            <Box>
                <Button
                    size="small"
                    sx={{ m: 1, textTransform: 'none' }}
                    variant="outlined"
                    onClick={() => setOpen(true)}
                >
                    <span>{t('buttons.addColor')}</span>
                </Button>
                <Dialog open={open} onClose={onCancel}>
                    <FormProvider {...methods}>
                        <DialogContent>
                            <SelectInput
                                required
                                focused
                                source="color"
                                choices={transformedColors}
                                validate={(value) => {
                                    const error = selectedColors.find(
                                        (item) => item.color === value,
                                    )
                                        ? 'Этот цвет уже выбран'
                                        : null

                                    if (error) {
                                        setHasError(true)
                                        return error
                                    }
                                    setHasError(false)
                                    setColorName(value)
                                }}
                                optionText={(value) => (
                                    <Card
                                        key={value.id}
                                        sx={{
                                            border: `2px solid ${colors[value.name]}`,
                                            borderRadius: '3px',
                                            p: 1,
                                            width: '100%',
                                        }}
                                    >
                                        {t(`colors.${value.name}`)}
                                    </Card>
                                )}
                            />
                            <CustomImageInput
                                prefix={colorName}
                                source="image"
                                placeholder={t('product.addImage')}
                                style={{
                                    maxWidth: 350,
                                    maxHeight: 350,
                                    objectFit: 'contain',
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                disabled={hasError}
                                onClick={handleAddColor}
                            >
                                <span>{t('buttons.save')}</span>
                            </Button>
                            <Button onClick={onCancel}>
                                <span>{t('buttons.cancel')}</span>
                            </Button>
                        </DialogActions>
                    </FormProvider>
                </Dialog>
            </Box>
        )
    },
)
