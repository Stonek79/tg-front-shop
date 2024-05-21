import { Card, Typography } from '@mui/material'
import { Button, SimpleForm, TextInput } from 'react-admin'
import { CategoryEditToolbar } from './CategoryEditToolbar'
import { ChangeEvent, Dispatch, memo, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Category } from '@/types/categories'
import { validateName } from '@/shared/lib/helpers/validateName'

interface CategoryEditContainerProps {
    selectedCategory: Category | null
    name: string | null
    setName: Dispatch<SetStateAction<string | null>>
    currentSelectedItem: string | null
    categoryNames: string[]
    onDeleteCategory: () => void
    onEditCategory: () => void
    addNewSubCategory: boolean
    setSelectedCategory: Dispatch<SetStateAction<Category | null>>
    setAddNewCategory: Dispatch<SetStateAction<boolean>>
    setCurrentSelectedItem: Dispatch<SetStateAction<string | null>>
}
export const CategoryEditContainer = memo(
    (props: CategoryEditContainerProps) => {
        const {
            selectedCategory,
            name,
            setName,
            currentSelectedItem,
            categoryNames,
            onDeleteCategory,
            onEditCategory,
            addNewSubCategory,
            setSelectedCategory,
            setAddNewCategory,
            setCurrentSelectedItem,
        } = props
        const { t } = getTranslation()

        return (
            <Card sx={{ padding: 2 }}>
                <Typography variant="h6">
                    {t('adminCategories.changeSubCategory')}
                </Typography>
                <SimpleForm
                    toolbar={
                        <CategoryEditToolbar
                            labels={{
                                save: t('buttons.save'),
                                delete: t('buttons.delete'),
                                confirmDeleteTitle: t(
                                    'adminCategories.confirmDeleteTitle',
                                ),
                                confirmDeleteContent: t(
                                    'adminCategories.confirmDeleteContent',
                                ),
                            }}
                            id={selectedCategory?.id!}
                            name={name || ''}
                            onDelete={onDeleteCategory}
                            onSave={onEditCategory}
                        />
                    }
                >
                    <Typography>
                        {t('adminCategories.selectedCategory')}
                    </Typography>
                    <ul>
                        <li>
                            <Typography>
                                {`${t('adminCategories.categoryId')}:
                                    ${currentSelectedItem}`}
                            </Typography>
                            <Typography>
                                {t('adminCategories.categoryName')}:
                            </Typography>
                            <TextInput
                                validate={[
                                    validateName(
                                        categoryNames,
                                        t('adminCategories.validateName'),
                                    ),
                                ]}
                                disabled={addNewSubCategory}
                                value={name}
                                inputProps={{ value: name }}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>,
                                ) => {
                                    setName(event.target.value)
                                }}
                                label={t('adminCategories.categoryName')}
                                source="name"
                            />
                            {selectedCategory?.parentId && (
                                <Box>
                                    <Typography>
                                        {t('adminCategories.parentCategory')}
                                    </Typography>
                                    <Typography>
                                        {`${t('adminCategories.categoryId')}: ${selectedCategory?.parentId}`}
                                    </Typography>
                                    <Typography>
                                        {`${t('adminCategories.categoryName')}:
                                            ${selectedCategory?.parent?.name}`}
                                    </Typography>
                                </Box>
                            )}
                        </li>
                    </ul>
                </SimpleForm>
                <Button
                    sx={{ textWrap: 'nowrap', p: 1 }}
                    disabled={addNewSubCategory}
                    onClick={() => {
                        setSelectedCategory(null)
                        setCurrentSelectedItem(null)
                        setAddNewCategory(false)
                    }}
                >
                    <>{t('buttons.cancel')}</>
                </Button>
            </Card>
        )
    },
)
