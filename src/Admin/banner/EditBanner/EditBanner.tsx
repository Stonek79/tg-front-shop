import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import {
    ListButton,
    SaveButton,
    ShowButton,
    Title,
    Toolbar,
    TopToolbar,
    UpdateParams,
    useEditController,
    useNotify,
    useUpdate,
} from 'react-admin'
import { Image } from '@/types/product'
import { useFormContext } from 'react-hook-form'
import { Banner } from '@/types/banner'
import { BannerForm } from '../BannerForm/BannerForm'
import { Card, Container } from '@mui/material'
import { useParams } from 'react-router'

const Save = () => {
    const { t } = getTranslation()
    const { id } = useParams()
    const notify = useNotify()
    const { getValues } = useFormContext()
    const [edit] = useUpdate()

    const handleCreate = async (e) => {
        e.preventDefault()
        const data = getValues()
        const formData = new FormData()

        console.log(data)
        const { bannerImage, createdAt, updatedAt, banner, ...rest } = data
        if (bannerImage && bannerImage.rawFile) {
            const image = new File(
                [(bannerImage as Image).rawFile],
                bannerImage.title,
                {
                    type: (bannerImage as Image).rawFile.type,
                },
            )
            formData.append('bannerImage', image)
        }

        formData.append('banner', JSON.stringify({ ...rest, bannerImage }))

        await edit(
            'banners/edit',
            { data: formData, id } as Partial<UpdateParams<Banner>>,
            {
                onSuccess: () => {
                    notify(t('banner.editSuccess'))
                },
                onError: (error) => {
                    notify(t('banner.editError'))
                    console.log(error)
                },
            },
        )
    }

    return (
        <Toolbar>
            <SaveButton type="button" variant="outlined" onClick={handleCreate}>
                <span>{t('buttons.save')}</span>
            </SaveButton>
        </Toolbar>
    )
}

const EditToolbar = () => (
    <TopToolbar>
        <ListButton />
        <ShowButton />
    </TopToolbar>
)

export const EditBanner = () => {
    const { t } = getTranslation()
    const { record } = useEditController<Banner>()

    if (!record) return null

    const parsedData = JSON.parse(record.banner)

    return (
        <Container>
            <Title title={t('banner.bannerEdit')} />
            <EditToolbar />
            <Card>
                <BannerForm record={parsedData} saveButton={<Save />} />
            </Card>
        </Container>
    )
}
