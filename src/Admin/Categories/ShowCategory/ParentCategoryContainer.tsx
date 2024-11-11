import { Box, Card, Container, ImageListItem, Typography } from '@mui/material'
import { imagesUrl } from '@/shared/consts/urls'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import type { Category } from '@/types/categories'

export const ParentCategoryContainer = ({ record }: { record: Category }) => {
    const { t } = getTranslation()

    if (!record?.parents) {
        return (
            <Typography
                padding={1}
                sx={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
                title={t('adminCategories.noParent')}
            >
                {t('adminCategories.noParent')}
            </Typography>
        )
    }

    const isMoreThanOneParent = record?.parents?.length > 1

    return (
        <Container sx={{ p: 0 }}>
            <Typography
                noWrap
                padding={2}
                fontWeight={700}
                title={t('adminCategories.parentCategory')}
            >
                {t('adminCategories.parentCategory')}
            </Typography>
            <Box
                sx={{
                    gap: 1,
                    alignItems: 'flex-start',
                    display: isMoreThanOneParent ? 'flex' : 'inherit',
                    flexDirection: isMoreThanOneParent ? 'column' : 'row',
                }}
            >
                {record?.parents.map((parent) => (
                    <Card
                        sx={{
                            p: 1,
                            gap: 1,
                            width: '100%',
                            maxWidth: isMoreThanOneParent ? '100%' : 200,
                            minWidth: 100,
                            display: isMoreThanOneParent ? 'flex' : 'inherit',
                            justifyContent: isMoreThanOneParent
                                ? 'space-between'
                                : 'center',
                        }}
                        key={parent.id}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                                }}
                                title={`ID: ${parent.id}`}
                                noWrap
                            >
                                ID: <b>{parent.id}</b>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                                }}
                                noWrap
                                title={`Название: ${parent.name}`}
                            >
                                Название: <b>{parent.name}</b>
                            </Typography>
                        </Box>
                        <ImageListItem
                            sx={{
                                position: 'relative',
                                width: isMoreThanOneParent
                                    ? 'fit-content'
                                    : '100%',
                                height: '0',
                                aspectRatio: '1 / 1',
                                overflow: isMoreThanOneParent
                                    ? 'visible'
                                    : 'hidden',
                                borderRadius: 2,
                            }}
                        >
                            <img
                                srcSet={`${imagesUrl}${parent.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${imagesUrl}${parent.image}?w=164&h=164&fit=crop&auto=format`}
                                alt={parent.name}
                                loading="lazy"
                                title={parent.name}
                                style={{
                                    position: isMoreThanOneParent
                                        ? 'inherit'
                                        : 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: isMoreThanOneParent
                                        ? '48px'
                                        : '100%',
                                    height: isMoreThanOneParent
                                        ? '48px'
                                        : '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </ImageListItem>
                    </Card>
                ))}
            </Box>
        </Container>
    )
}
