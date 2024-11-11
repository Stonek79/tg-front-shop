import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import {
    Button,
    CreateButton,
    CreateParams,
    Edit,
    isEmpty,
    ListButton,
    maxLength,
    minLength,
    required,
    SelectArrayInput,
    ShowButton,
    SimpleForm,
    TextInput,
    TopToolbar,
    useRedirect,
    useShowController,
    useUpdate,
} from 'react-admin'
import type { Category } from '@/types/categories'
import { Box, Container } from '@mui/material'
import { CustomImageInput } from '@/Admin/ui'
import { apiUrl, imagesUrl } from '@/shared/consts/urls'
import { useNavigate } from 'react-router'
import { useNamesStore } from '@/shared/state/namesList'
import { useCategoriesStore } from '@/shared/state/categories'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export const EditCategory = () => {
    const { t } = getTranslation()
    const { record } = useShowController<Category>()
    const redirect = useRedirect()
    const navigate = useNavigate()
    const [edit] = useUpdate()
    const {
        categories: data,
        isLoading,
        fetchCategories,
        rootId,
    } = useCategoriesStore()
    const { namesList } = useNamesStore()
    const categoriesTitles = namesList['CategoriesNames']

    const onEditCategory = async (data: FieldValues) => {
        const formData = new FormData()

        const { image, parentIds, id, name, childrenIds } = data

        if (image && image.rawFile) {
            formData.append('categoryImage', image.rawFile)
        }

        formData.append(
            'data',
            JSON.stringify({
                image: image.title,
                parentIds,
                childrenIds,
                name,
            }),
        )

        await edit(
            'categories/edit',
            {
                data: formData,
                id,
            } as Partial<CreateParams<Partial<Category>>>,
            {
                onSuccess: (data) => {
                    console.log(data, 'SUCCESS')
                    fetchCategories(`${apiUrl}/categories`)
                    navigate('/categories')
                },
                onError: (error) => {
                    console.log(error)
                },
            },
        )
    }
    if (!record || isLoading) return null

    const Actions = () => (
        <TopToolbar>
            <ListButton />
            <CreateButton />
            <ShowButton />
        </TopToolbar>
    )

    const validateUnique = (value: string) => {
        if (categoriesTitles.includes(value) && value !== record.name) {
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

    const require = (message = 'errors.required') =>
        Object.assign(
            (value: string | undefined) =>
                isEmpty(value) && record?.id !== rootId
                    ? t(message)
                    : undefined,
            { isRequired: true },
        )

    const validateParentField = [
        require('adminCategories.errors.parentRequired'),
    ]

    const choices = data?.length ? [data[0], ...data[0].children!] : []

    return (
        <Edit
            title={`${t('adminCategories.editCategory')}: ${record.name}`}
            actions={<Actions />}
        >
            <SimpleForm
                mode="onBlur"
                reValidateMode="onChange"
                record={{
                    ...record,
                    image: {
                        src: `${imagesUrl}${record.image}`,
                        title: record.image,
                    },
                }}
                onSubmit={
                    ((
                        data: FieldValues extends Category
                            ? FieldValues
                            : never,
                    ) => {
                        onEditCategory(data)
                    }) as SubmitHandler<FieldValues>
                }
            >
                <Container
                    sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'column',
                        }}
                    >
                        <SelectArrayInput
                            validate={validateParentField}
                            sx={{ width: 350 }}
                            source="parentIds"
                            choices={choices}
                            optionValue={'id'}
                            optionText={'name'}
                            label={t('adminCategories.parentCategory')}
                            defaultValue={record?.parentIds}
                        />
                        <SelectArrayInput
                            sx={{ width: 350 }}
                            source="childrenIds"
                            choices={choices.filter(
                                (item) =>
                                    item.id !== rootId && item.id !== record.id,
                            )}
                            optionValue={'id'}
                            optionText={'name'}
                            label={t('adminCategories.childrenCategories')}
                            defaultValue={record?.childrenIds}
                        />
                        <TextInput
                            sx={{ width: 350 }}
                            label={t('adminCategories.categoryName')}
                            source="name"
                            validate={validateNameField}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    width: 'fit-content',
                                }}
                                onClick={() =>
                                    redirect(
                                        'create',
                                        'categories',
                                        '',
                                        {},
                                        {
                                            record: {
                                                parentId: record?.id || '',
                                            },
                                        },
                                    )
                                }
                                variant="contained"
                                label={t('adminCategories.addSubCategory')}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <CustomImageInput
                            prefix={`${record.name}`}
                            postfix={'category'}
                            style={{ width: 350, height: 350 }}
                            source="image"
                        />
                    </Box>
                </Container>
            </SimpleForm>
        </Edit>
    )
}
