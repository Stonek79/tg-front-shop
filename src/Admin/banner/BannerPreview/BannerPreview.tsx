import { useWatch } from 'react-hook-form'
import { Card, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { imagesUrl } from '@/shared/consts/urls'

export const BannerPreview = () => {
    const { t } = getTranslation()
    const watch = useWatch()
    const {
        bannerImage,
        bannerText,
        bannerColor,
        bannerHeight,
        bannerLink,
        bannerLinkOn,
        bannerTextPositionHorizontal,
        bannerTextPositionVertical,
        letterSpacing,
        fontName,
    } = watch

    return (
        <Container>
            <Typography variant="h6" mb={2}>
                {t('banner.preview')}
            </Typography>
            <Card
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: bannerHeight,
                    background: bannerColor,
                    alignItems: bannerTextPositionHorizontal,
                    justifyContent: bannerTextPositionVertical,
                }}
            >
                {bannerImage && (
                    <img
                        style={{ width: 'fit-content', height: bannerHeight }}
                        src={bannerImage?.src ?? `${imagesUrl}${bannerImage}`}
                        alt={'Banner image'}
                    />
                )}
                {bannerLinkOn ? (
                    <Link
                        style={{ position: 'absolute', color: 'inherit' }}
                        href={bannerLink}
                        prefetch
                    >
                        <p
                            style={{
                                letterSpacing: letterSpacing,
                                fontFamily: fontName,
                            }}
                            dangerouslySetInnerHTML={{ __html: bannerText }}
                        />
                    </Link>
                ) : (
                    <p
                        style={{
                            position: 'absolute',
                            letterSpacing: letterSpacing,
                            fontFamily: fontName,
                        }}
                        dangerouslySetInnerHTML={{ __html: bannerText }}
                    />
                )}
            </Card>
        </Container>
    )
}
