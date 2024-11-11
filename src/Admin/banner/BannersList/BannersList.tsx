import {
    CreateButton,
    Title,
    TopToolbar,
    useRedirect,
    ListBase,
    WithListContext,
    RaRecord,
} from 'react-admin'
import { Card, Container, Stack } from '@mui/material'
import Link from 'next/link'
import { imagesUrl } from '@/shared/consts/urls'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Banner } from '@/types/banner'

export const BannersList = () => {
    const { t } = getTranslation()
    const redirect = useRedirect()

    return (
        <ListBase>
            <Container
                sx={{
                    mt: 3,
                }}
            >
                <Title title={t('banner.bannersList')} />
                <TopToolbar>
                    <CreateButton />
                </TopToolbar>
                <WithListContext<Banner[]>
                    render={({ isPending, data }) =>
                        !isPending && (
                            <Stack spacing={1}>
                                {data?.length &&
                                    data?.map((banner: Partial<RaRecord>) => {
                                        const parsedBanner = JSON.parse(
                                            (banner as Banner).banner,
                                        )
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
                                        } = parsedBanner

                                        return (
                                            <Card
                                                onClick={() =>
                                                    redirect(
                                                        'edit',
                                                        'banners',
                                                        banner.id,
                                                    )
                                                }
                                                key={banner.id}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: bannerHeight,
                                                    background: bannerColor,
                                                    alignItems:
                                                        bannerTextPositionHorizontal,
                                                    justifyContent:
                                                        bannerTextPositionVertical,
                                                }}
                                            >
                                                {bannerImage && (
                                                    <img
                                                        style={{
                                                            width: 'fit-content',
                                                            height: bannerHeight,
                                                        }}
                                                        src={`${imagesUrl}${bannerImage}`}
                                                        alt={'Banner image'}
                                                    />
                                                )}
                                                {bannerLinkOn ? (
                                                    <Link
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            color: 'inherit',
                                                        }}
                                                        href={bannerLink}
                                                        prefetch
                                                    >
                                                        <p
                                                            style={{
                                                                letterSpacing:
                                                                    letterSpacing,
                                                                fontFamily:
                                                                    fontName,
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: bannerText,
                                                            }}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <p
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            letterSpacing:
                                                                letterSpacing,
                                                            fontFamily:
                                                                fontName,
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: bannerText,
                                                        }}
                                                    />
                                                )}
                                            </Card>
                                        )
                                    })}
                            </Stack>
                        )
                    }
                />
            </Container>
        </ListBase>
    )
}
