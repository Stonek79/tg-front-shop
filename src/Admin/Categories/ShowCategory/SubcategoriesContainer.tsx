import {
    Box,
    Card,
    Container,
    ImageListItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { imagesUrl } from '@/shared/consts/urls'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import type { Category } from '@/types/categories'
import { memo } from 'react'

// eslint-disable-next-line react/display-name
export const SubcategoriesContainer = memo(
    ({ record }: { record: Category }) => {
        const { t } = getTranslation()

        if (!record) return null
        return (
            <Container sx={{ p: 1 }}>
                <Typography
                    fontWeight={700}
                    padding={2}
                    title={t('adminCategories.subCategories')}
                >
                    {`${t('adminCategories.subCategories')}`}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                    }}
                >
                    {record?.children?.length === 0 ? (
                        <Typography
                            padding={2}
                            title={t('adminCategories.noSubCategories')}
                        >
                            {t('adminCategories.noSubCategories')}
                        </Typography>
                    ) : (
                        record?.children?.map((rec) => (
                            <Card
                                sx={{
                                    flex: '1 1 calc(25% - 1.5rem)',
                                    minWidth: '100px',
                                    // maxWidth: 'calc(33.33% - 1.5rem)',
                                    maxWidth: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                    p: 1,
                                }}
                                key={rec.id}
                            >
                                <Tooltip title={rec.name} placement="top">
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize:
                                                        'clamp(0.75rem, 2vw, 1rem)',
                                                }}
                                                noWrap
                                                title={`ID: ${rec.id}`}
                                            >
                                                ID: <b>{rec.id}</b>
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize:
                                                        'clamp(0.75rem, 2vw, 1rem)',
                                                }}
                                                noWrap
                                                title={`Название: ${rec.name}`}
                                            >
                                                Название: <b>{rec.name}</b>
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
                                                srcSet={`${imagesUrl}${rec.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                src={`${imagesUrl}${rec.image}?w=164&h=164&fit=crop&auto=format`}
                                                alt={rec.name}
                                                loading="lazy"
                                                title={rec.name}
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
                                    </Box>
                                </Tooltip>
                            </Card>
                        ))
                    )}
                </Box>
            </Container>
        )
    },
)
