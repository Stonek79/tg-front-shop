import { CustomImageInput } from '@/Admin/ui'
import {
    Create,
    CreateParams,
    ListButton,
    SimpleForm,
    TopToolbar,
    useCreate,
} from 'react-admin'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Image } from '@/types/product'
import { useNavigate } from 'react-router'

export const AddNewImage = () => {
    const { t } = getTranslation()
    const navigate = useNavigate()
    const [create] = useCreate()

    const handleCreate = (data) => {
        const formData = new FormData()

        const { newImage } = data
        const image = new File([(newImage as Image).rawFile], newImage.title, {
            type: (newImage as Image).rawFile.type,
        })
        formData.append('image', image)
        formData.append('imagename', newImage.title)

        create(
            'images/create',
            { data: formData } as Partial<CreateParams<Partial<Image>>>,
            {
                onSuccess: () => {
                    navigate('/images')
                },
                onError: (error) => {
                    console.log(error)
                },
            },
        )
    }

    return (
        <Create
            actions={
                <TopToolbar>
                    <ListButton />
                </TopToolbar>
            }
        >
            <SimpleForm onSubmit={handleCreate}>
                <CustomImageInput
                    source="newImage"
                    placeholder={t('buttons.addImage')}
                    style={{
                        width: 300,
                        height: 300,
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </SimpleForm>
        </Create>
    )
}
