import { memo } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Box } from '@mui/material'
import { BooleanInput } from 'react-admin'

// eslint-disable-next-line react/display-name
export const SwitchersTab = memo(() => {
    const { t } = getTranslation()

    return (
        <Box>
            <BooleanInput source={'onSale'} label={t('product.onSale')} />
            <BooleanInput source={'onTop'} label={t('product.onTop')} />
        </Box>
    )
})
