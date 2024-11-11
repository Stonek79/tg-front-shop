import { memo } from 'react'
import { Box } from '@mui/material'
import { CustomImageInput } from '@/Admin/ui'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useTabState } from '@/shared/state/productTabState'

// eslint-disable-next-line react/display-name
export const ImagesTab = memo(() => {
    const { t } = getTranslation()
    const title = useTabState.use.title()

    return (
        <>
            <Box sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}>
                <CustomImageInput
                    source="thumbnail"
                    label={t('product.thumbnail')}
                    placeholder={t('product.addImage')}
                    style={{
                        width: 300,
                        height: 300,
                        objectFit: 'contain',
                    }}
                    prefix={title}
                />
                <CustomImageInput
                    source="images"
                    multiple
                    label={t('product.images')}
                    placeholder={t('product.addImage')}
                    style={{
                        width: 300,
                        height: 300,
                        objectFit: 'contain',
                    }}
                    prefix={title}
                />
            </Box>
        </>
    )
})
