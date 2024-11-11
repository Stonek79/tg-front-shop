import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import {
    Create,
    CreateParams,
    ListButton,
    maxLength,
    minLength,
    required,
    SelectArrayInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    useCreate,
    useNotify,
} from 'react-admin'
import { useLocation, useNavigate } from 'react-router'
import { CustomImageInput } from '@/Admin/ui'
import { useState } from 'react'
import { Category } from '@/types/categories'
import { useNamesStore } from '@/shared/state/namesList'
import { useCategoriesStore } from '@/shared/state/categories'
import { apiUrl } from '@/shared/consts/urls'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export const CreateCategory = () => {
    const { state } = useLocation()
    const { t } = getTranslation()
    const notify = useNotify()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [create] = useCreate()
    const { categories: data, fetchCategories, rootId } = useCategoriesStore()
    const { namesList } = useNamesStore()
    const categoriesTitles = namesList['CategoriesNames']

    const onCreateCategory = async (data: FieldValues) => {
        const formData = new FormData()

        const { image } = data

        if (image && image.rawFile) {
            formData.append('categoryImage', image.rawFile)
        }

        formData.append('data', JSON.stringify(data))

        await create(
            'categories/create',
            {
                data: formData,
            } as Partial<CreateParams<Partial<Category>>>,
            {
                onSuccess: (data) => {
                    console.log(data, 'SUCCESS')
                    fetchCategories(`${apiUrl}/categories`)
                    navigate('/categories')
                },
                onError: (error) => {
                    console.log(error)
                    notify('error', {
                        type: 'error',
                        autoHideDuration: 2000,
                        multiLine: true,
                    })
                },
            },
        )
    }

    const Actions = () => (
        <TopToolbar>
            <ListButton />
        </TopToolbar>
    )

    const validateUnique = (value: string) => {
        if (categoriesTitles.includes(value)) {
            return t('errors.categoryExists')
        }
        return undefined
    }

    const validateNameField = [
        required(t('errors.categoryNameRequired')),
        minLength(3),
        maxLength(25),
        validateUnique,
    ]

    const hasParentId = !!state?.record?.parentId
    const choices = data?.length ? [data[0], ...data[0].children!] : []

    return (
        <Create actions={<Actions />}>
            <SimpleForm
                mode="onBlur"
                reValidateMode="onChange"
                onSubmit={
                    ((
                        data: FieldValues extends Category
                            ? FieldValues
                            : never,
                    ) => {
                        onCreateCategory(data)
                    }) as SubmitHandler<FieldValues>
                }
            >
                <SelectArrayInput
                    sx={{ width: 350 }}
                    source="parentIds"
                    choices={choices}
                    optionValue={'id'}
                    optionText={'name'}
                    label={t('adminCategories.parentCategory')}
                />
                <SelectArrayInput
                    sx={{ width: 350 }}
                    source="childrenIds"
                    choices={choices.filter((item) => item.id !== rootId)}
                    optionValue={'id'}
                    optionText={'name'}
                    label={t('adminCategories.childrenCategories')}
                />
                <TextInput
                    sx={{ width: 300 }}
                    onChange={(e) => {
                        setName(() => e.target.value)
                    }}
                    label={
                        hasParentId
                            ? t('adminCategories.newSubCategory')
                            : t('adminCategories.newCategory')
                    }
                    source="name"
                    validate={validateNameField}
                />
                <CustomImageInput
                    prefix={name}
                    postfix={'category'}
                    style={{ width: 350, height: 350 }}
                    source="image"
                />
            </SimpleForm>
        </Create>
    )
}
