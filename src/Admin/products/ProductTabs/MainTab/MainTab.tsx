import { memo } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import {
    minLength,
    NumberInput,
    required,
    TextInput,
    useRecordContext,
} from 'react-admin'
import { Product } from '@/types/product'
import { useNamesStore } from '@/shared/state/namesList'
import { useController } from 'react-hook-form'
import { useTabState } from '@/shared/state/productTabState'
import { Alert, Box, InputAdornment } from '@mui/material'
import { RichTextInput } from 'ra-input-rich-text'

// eslint-disable-next-line react/display-name
export const MainTab = memo(({ isCreate = false }: { isCreate?: boolean }) => {
    const { t } = getTranslation()
    const currentProduct = useRecordContext<Product>()
    const { namesList } = useNamesStore()
    const productsTitles = namesList['ProductsList']
    const {
        field,
        fieldState: { error },
    } = useController({ name: 'title' })
    const setTitle = useTabState.use.setTitle()

    const validateUnique = (value: string) => {
        if (
            productsTitles.includes(value?.trim()) &&
            currentProduct?.title !== value?.trim()
        ) {
            return t('errors.titleExists')
        }
        return undefined
    }
    const validateTitle = [required(), minLength(8), validateUnique]

    const trigger = !field?.value || error
    return (
        <Box>
            {trigger && (
                <Alert severity="warning">{t('errors.tabsDisabled')}</Alert>
            )}
            <TextInput
                sx={{ width: '100%', maxWidth: 700 }}
                label={t('product.name')}
                source={'title'}
                validate={validateTitle}
                onChange={(e) => {
                    isCreate && setTitle(e.target.value)
                }}
            />
            <RichTextInput
                sx={{ width: '100%' }}
                label={t('product.description')}
                source={'description'}
            />
            <NumberInput
                required
                sx={{ width: 300 }}
                source={'weight'}
                label={t('product.weight')}
                step={0.1}
                min={0.1}
                max={50}
                format={(v) => Number(v).toFixed(1)}
                defaultValue={0.1}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">кг</InputAdornment>
                    ),
                }}
            />
        </Box>
    )
})
