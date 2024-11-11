import { CustomImageInput } from '@/Admin/ui'
import { RichTextInput } from 'ra-input-rich-text'
import { Box } from '@mui/material'
import {
    BooleanInput,
    NumberInput,
    RaRecord,
    SimpleForm,
    TextInput,
} from 'react-admin'
import { BannerColorInput } from '../BannerColorInput/BannerColorInput'
import { BannerPreview } from '../BannerPreview/BannerPreview'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { ReactElement } from 'react'

export const BannerForm = ({
    record,
    saveButton,
}: {
    record?: Partial<RaRecord>
    saveButton: ReactElement<HTMLButtonElement>
}) => {
    const { t } = getTranslation()

    return (
        <SimpleForm record={record} toolbar={saveButton}>
            <CustomImageInput
                label={t('banner.bannerImage')}
                source="bannerImage"
                placeholder={t('buttons.addImage')}
                style={{
                    width: 300,
                    height: 300,
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                postfix="banner"
            />
            <RichTextInput
                defaultValue={'Banner text'}
                label={t('banner.bannerText')}
                source="bannerText"
            />
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <NumberInput
                    defaultValue={200}
                    label={t('banner.bannerHeight')}
                    source="bannerHeight"
                />
                <TextInput
                    defaultValue={'center'}
                    label={t('banner.bannerTextPositionHorizontal')}
                    source="bannerTextPositionHorizontal"
                />
                <TextInput
                    defaultValue={'center'}
                    label={t('banner.bannerTextPositionVertical')}
                    source="bannerTextPositionVertical"
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <NumberInput
                    source="letterSpacing"
                    label={t('banner.letterSpacing')}
                    defaultValue={1}
                />
                <TextInput
                    source="fontName"
                    label={t('banner.fontName')}
                    defaultValue="roboto"
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <BannerColorInput
                    name="bannerColor"
                    label={t('banner.bannerColor')}
                />
                <TextInput
                    defaultValue={'/'}
                    label={t('banner.bannerLink')}
                    source="bannerLink"
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <BooleanInput
                    source={'onBanner'}
                    label={t('banner.onBanner')}
                />
                <BooleanInput
                    label={t('banner.bannerLinkOn')}
                    source="bannerLinkOn"
                />
            </Box>
            <BannerPreview />
        </SimpleForm>
    )
}
