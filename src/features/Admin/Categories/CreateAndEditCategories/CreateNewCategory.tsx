import Box from '@mui/material/Box'
import { CategoriesTreeView } from '../CategoriesTree/CategoriesTree'
import { Button, SimpleForm, TextInput } from 'react-admin'
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { Card } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Category } from '@/types/categories'
import { validateName } from '@/shared/lib/helpers/validateName'

interface CreateNewCategoryProps {
    items: Category[]
    itemsTree: Category[]
    onAddCategory: (data: Record<string, string>) => void
    handleItemSelectionToggle: (
        event: SyntheticEvent,
        itemId: string | number,
        isSelected: boolean,
    ) => void
    setSelectedCategory: Dispatch<SetStateAction<Category | null>>
    setCurrentSelectedItem: Dispatch<SetStateAction<string | null>>
    addNewCategory: boolean
    setAddNewCategory: Dispatch<SetStateAction<boolean>>
    categoryNames: string[]
    name: string | null
    setName: Dispatch<SetStateAction<string | null>>
    currentSelectedItem: string | null
}
export const CreateNewCategory = (props: CreateNewCategoryProps) => {
    const { t } = getTranslation()
    const {
        items,
        itemsTree,
        onAddCategory,
        handleItemSelectionToggle,
        setSelectedCategory,
        setCurrentSelectedItem,
        addNewCategory,
        categoryNames,
        setAddNewCategory,
        name,
        setName,
        currentSelectedItem,
    } = props
    return (
        <Card
            sx={{
                p: 2,
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    maxWidth: 400,
                }}
            >
                <CategoriesTreeView
                    treeItems={itemsTree}
                    onItemSelectionToggle={handleItemSelectionToggle}
                    getItemId={(item) => item.id.toString()}
                    getItemLabel={(item) => item.name}
                    onItemFocus={(_event, itemId) => {
                        const selectedCategory = items.find(
                            (item) => item.id.toString() === itemId,
                        )
                        setCurrentSelectedItem(itemId)
                        selectedCategory &&
                            setSelectedCategory(selectedCategory)
                    }}
                />
            </Box>
            {addNewCategory && (
                <Box>
                    <SimpleForm onSubmit={onAddCategory} id="addNewCategory">
                        <TextInput
                            validate={[
                                validateName(
                                    categoryNames,
                                    t('adminCategories.validateName'),
                                ),
                            ]}
                            value={name || ''}
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>,
                            ) => {
                                setName(event.target.value)
                            }}
                            label={t('adminCategories.categoryName')}
                            source="name"
                        />
                    </SimpleForm>
                </Box>
            )}
            <Box>
                <Button
                    disabled={!!currentSelectedItem}
                    onClick={() => {
                        setAddNewCategory(!addNewCategory)
                    }}
                    sx={{ textWrap: 'nowrap', p: 1 }}
                >
                    <>
                        {addNewCategory
                            ? t('buttons.cancel')
                            : t('adminCategories.addCategory')}
                    </>
                </Button>
            </Box>
        </Card>
    )
}
