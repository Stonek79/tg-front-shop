import {
    SaveButton,
    Toolbar,
    useCreate,
    CreateParams,
    ListButton,
    TopToolbar,
    useNotify,
    Create,
} from 'react-admin'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useFormContext } from 'react-hook-form'
import { Image } from '@/types/product'
import { Banner } from '@/types/banner'
import { BannerForm } from '../BannerForm/BannerForm'

const Save = () => {
    const { t } = getTranslation()
    const notify = useNotify()
    const { getValues } = useFormContext()
    const [create] = useCreate()

    const handleCreate = (e) => {
        e.preventDefault()
        const data = getValues()
        const formData = new FormData()

        const { bannerImage } = data

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

        formData.append('banner', JSON.stringify(data))

        create(
            'banners/create',
            { data: formData } as Partial<CreateParams<Banner>>,
            {
                onSuccess: (data) => {
                    notify(t('banner.createSuccess'))
                    console.log(data, 'SUCCESS')
                },
                onError: (error) => {
                    notify(t('banner.createError'))
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

const CreateToolbar = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
)

export const CreateBanner = () => (
    <Create actions={<CreateToolbar />}>
        <BannerForm saveButton={<Save />} />
    </Create>
)
