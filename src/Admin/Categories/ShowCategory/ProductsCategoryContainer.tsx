import { Box, Container, Typography } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import type { Category } from '@/types/categories'

export const ProductsCategoryContainer = ({ record }: { record: Category }) => {
    const { t } = getTranslation()
    return (
        <Container sx={{ p: 0 }}>
            <Typography
                title={t('adminCategories.categoryProducts')}
                padding={2}
                fontWeight={700}
                noWrap
            >
                {t('adminCategories.categoryProducts')}
            </Typography>
            <Box>
                {record?.products.length > 0 ? (
                    <Typography
                        padding={2}
                        title={t('adminCategories.totalProducts')}
                    >
                        {`${t('adminCategories.totalProducts')} - ${record?.products.length}`}
                    </Typography>
                ) : (
                    <Typography
                        padding={2}
                        title={t('adminCategories.noProducts')}
                    >
                        {t('adminCategories.noProducts')}
                    </Typography>
                )}
            </Box>
        </Container>
    )
}
