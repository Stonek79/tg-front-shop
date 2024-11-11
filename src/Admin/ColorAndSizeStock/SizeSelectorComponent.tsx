import { Button, SelectInput } from 'react-admin'
import { sizes } from '@/shared/consts/sizes'
import { SelectInputFieldWrapper } from './SelectInputFieldWrapper'
import { AdminDialog } from '@/Admin/ui'
import { Box } from '@mui/material'
import { memo, useState } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Size } from '@/types/product'
import { FormProvider, useForm } from 'react-hook-form'

const preparedSizes = sizes.map((size) => ({ id: size, name: size }))

// eslint-disable-next-line react/display-name
export const SizeSelectorComponent = memo(
    ({
        sizes,
        setSize,
    }: {
        sizes: { name: string }[]
        setSize: (size: { name: string }) => void
    }) => {
        const { t } = getTranslation()
        const [open, setOpen] = useState(false)
        const [selectedSizes, setSelectedSizes] = useState('')
        const [error, setError] = useState(false)

        const methods = useForm({ mode: 'onChange' })
        const { reset, setError: setError2, clearErrors } = methods

        const onOpen = () => {
            setSelectedSizes('')
            setOpen(true)
        }

        const onCancel = () => {
            setSelectedSizes('')
            setOpen(false)
            setError(false)
            reset()
        }

        const onSubmit = () => {
            if (!selectedSizes) {
                setError2('size', {
                    message: t('errors.sizeRequired'),
                })
                return
            }
            setSize({ name: selectedSizes })
            onCancel()
            reset()
        }

        const SizeContent = () => (
            <SelectInput
                required
                focused
                source="size"
                onChange={(event) => {
                    setSelectedSizes(event.target.value)
                }}
                choices={preparedSizes}
                value={selectedSizes}
                optionValue="name"
                validate={(value) => {
                    if (sizes.find((v) => v.name === value)) {
                        setError(true)
                        return 'Этот размер уже выбран'
                    }
                    clearErrors('size')
                    setError(false)
                    return undefined
                }}
                optionText={({ id, ...name }) => (
                    <SelectInputFieldWrapper
                        value={name as Size}
                        type={'size'}
                    />
                )}
            />
        )

        const SizeActions = () => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button disabled={error} onClick={onSubmit}>
                    <span>{t('buttons.save')}</span>
                </Button>
                <Button onClick={onCancel}>
                    <span>{t('buttons.cancel')}</span>
                </Button>
            </Box>
        )

        return (
            <Box>
                <Button
                    size="small"
                    sx={{ m: 1, textTransform: 'none' }}
                    variant="outlined"
                    onClick={onOpen}
                >
                    <span>{t('buttons.addSize')}</span>
                </Button>
                <FormProvider {...methods}>
                    <AdminDialog
                        title={t('product.size')}
                        isOpenDialog={open}
                        setIsOpenDialog={onCancel}
                        content={<SizeContent />}
                        actions={<SizeActions />}
                    />
                </FormProvider>
            </Box>
        )
    },
)
