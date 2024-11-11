import { Box, Card, Container, ImageListItem, Typography } from '@mui/material'
import { imagesUrl } from '@/shared/consts/urls'
import type { Category } from '@/types/categories'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export const SelectedCategoryContainer = ({ record }: { record: Category }) => {
    const { t } = getTranslation()
    return (
        <Container sx={{ p: 0 }}>
            <Typography
                noWrap
                fontWeight={700}
                padding={2}
                title={t('adminCategories.selectedCategory')}
            >
                {t('adminCategories.selectedCategory')}
            </Typography>
            <Card
                sx={{
                    p: 1,
                    gap: 1,
                    width: '100%',
                    maxWidth: 200,
                    minWidth: 100,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
                        title={`ID: ${record.id}`}
                        noWrap
                    >
                        ID: <b>{record.id}</b>
                    </Typography>
                    <Typography
                        sx={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
                        noWrap
                        title={`Название: ${record.name}`}
                    >
                        Название: <b>{record.name}</b>
                    </Typography>
                </Box>
                <ImageListItem
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '0',
                        aspectRatio: '1 / 1',
                        overflow: 'hidden',
                        borderRadius: 2,
                    }}
                >
                    <img
                        srcSet={`${imagesUrl}${record.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${imagesUrl}${record.image}?w=164&h=164&fit=crop&auto=format`}
                        alt={record.name}
                        loading="lazy"
                        title={record.name}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </ImageListItem>
            </Card>
        </Container>
    )
}
