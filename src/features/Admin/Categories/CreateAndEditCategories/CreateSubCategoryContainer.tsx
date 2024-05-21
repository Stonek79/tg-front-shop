import Box from '@mui/material/Box'
import { Card, Typography } from '@mui/material'
import { Button, SimpleForm, TextInput } from 'react-admin'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Category } from '@/types/categories'
import { validateName } from '@/shared/lib/helpers/validateName'

interface CreateSubCategoryContainerProps {
    addNewSubCategory: boolean
    onAddSubCategory: () => void
    subName: string | null
    setSubName: Dispatch<SetStateAction<string | null>>
    categoryNames: string[]
    selectedCategory: Category | null
    setAddNewSubCategory: Dispatch<SetStateAction<boolean>>
    currentSelectedItem: string | null
}
export const CreateSubCategoryContainer = (
    props: CreateSubCategoryContainerProps,
) => {
    const {
        addNewSubCategory,
        onAddSubCategory,
        subName,
        setSubName,
        categoryNames,
        selectedCategory,
        setAddNewSubCategory,
        currentSelectedItem,
    } = props
    const { t } = getTranslation()
    return (
        <Card
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: addNewSubCategory ? 'inherit' : 'fit-content',
            }}
        >
            <Box>
                {addNewSubCategory && (
                    <Typography variant="h6">
                        {t('adminCategories.newSubCategory')}
                    </Typography>
                )}
                {addNewSubCategory && (
                    <SimpleForm onSubmit={onAddSubCategory}>
                        <ul>
                            <li>
                                <Typography>
                                    {t('adminCategories.categoryName')}
                                </Typography>
                                <TextInput
                                    validate={[
                                        validateName(
                                            categoryNames,
                                            t('adminCategories.validateName'),
                                        ),
                                    ]}
                                    value={subName}
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setSubName(event.target.value)
                                    }}
                                    label={t('adminCategories.categoryName')}
                                    source="subname"
                                />
                                <Box>
                                    <Typography>
                                        {t('adminCategories.parentCategory')}
                                    </Typography>
                                    <Typography>
                                        {`${t('adminCategories.categoryId')}: ${currentSelectedItem}`}
                                    </Typography>
                                    <Typography>
                                        {`${t('adminCategories.categoryName')}:
                                            ${selectedCategory?.name}`}
                                    </Typography>
                                </Box>
                            </li>
                        </ul>
                    </SimpleForm>
                )}
            </Box>
            <Box>
                <Button
                    onClick={() => setAddNewSubCategory(!addNewSubCategory)}
                    sx={{ textWrap: 'nowrap', p: 1 }}
                >
                    <>
                        {!addNewSubCategory
                            ? t('adminCategories.addSubCategory')
                            : t('buttons.cancel')}
                    </>
                </Button>
            </Box>
        </Card>
    )
}
