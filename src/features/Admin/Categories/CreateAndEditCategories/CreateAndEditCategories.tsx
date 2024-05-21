import Box from '@mui/material/Box'
import { useCreate, useDelete, useUpdate } from 'react-admin'
import { memo, SyntheticEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { buildCategoriesTree } from '@/shared/lib/helpers/categoriesTreeBuilder'
import { Category } from '@/types/categories'
import { CategoryEditContainer } from './EditCategoryContainer'
import { CreateSubCategoryContainer } from './CreateSubCategoryContainer'
import { CreateNewCategory } from './CreateNewCategory'

// eslint-disable-next-line react/display-name
export const CreateAndEditCategories = memo(
    ({ items, refetch }: { items: Category[]; refetch: () => void }) => {
        const itemsTree = useMemo(() => buildCategoriesTree(items), [items])
        const [selectedCategory, setSelectedCategory] =
            useState<Category | null>(null)
        const [currentSelectedItem, setCurrentSelectedItem] = useState<
            string | null
        >(null)
        const [name, setName] = useState<string | null>(null)
        const [subName, setSubName] = useState<string | null>(null)
        const [addNewCategory, setAddNewCategory] = useState<boolean>(false)
        const [addNewSubCategory, setAddNewSubCategory] =
            useState<boolean>(false)

        const [create] = useCreate()
        const [update] = useUpdate()
        const [deleteOne] = useDelete()
        const navigate = useNavigate()

        const categoryNames = useMemo(
            () => items.map((category) => category.name),
            [items],
        )

        const handleItemSelectionToggle = (
            event: SyntheticEvent,
            itemId: string | number,
            isSelected: boolean,
        ) => {
            if (isSelected) {
                const selectedCategory = items.find(
                    (item) => item.id.toString() === itemId,
                )
                setCurrentSelectedItem(`${itemId}`)
                selectedCategory && setName(selectedCategory?.name)
                selectedCategory && setSelectedCategory(selectedCategory)
            }
        }

        const onAddCategory = (data: Record<string, string>) => {
            create(
                'category/create',
                { data },
                {
                    onSuccess: () => {
                        refetch()
                        navigate('/category')
                        setAddNewCategory(false)
                    },
                },
            )
        }
        const onEditCategory = () => {
            update(
                'category/edit',
                { id: selectedCategory?.id, data: { name: name } },
                {
                    onSuccess: () => {
                        refetch()
                        navigate('/category')
                        setSelectedCategory(null)
                    },
                },
            )
        }

        const onAddSubCategory = () => {
            const subCategory = {
                name: subName,
                parentId: selectedCategory?.id,
            }

            create(
                'category/create',
                { data: subCategory },
                {
                    onSuccess: () => {
                        refetch()
                        navigate('/category')
                        setAddNewSubCategory(false)
                    },
                },
            )
        }

        const onDeleteCategory = () => {
            deleteOne(
                'category',
                { id: selectedCategory?.id },
                {
                    onSuccess: (data, variables, context) => {
                        refetch()
                        navigate('/category')
                        setSelectedCategory(null)
                        setCurrentSelectedItem(null)
                    },
                },
            )
        }

        return (
            <Box sx={{ display: 'flex', gap: 2, width: '100%', m: 2 }}>
                <CreateNewCategory
                    items={items}
                    currentSelectedItem={currentSelectedItem}
                    categoryNames={categoryNames}
                    setSelectedCategory={setSelectedCategory}
                    name={name}
                    setName={setName}
                    setAddNewCategory={setAddNewCategory}
                    addNewCategory={addNewCategory}
                    onAddCategory={onAddCategory}
                    setCurrentSelectedItem={setCurrentSelectedItem}
                    itemsTree={itemsTree}
                    handleItemSelectionToggle={handleItemSelectionToggle}
                />
                {selectedCategory && (
                    <CategoryEditContainer
                        selectedCategory={selectedCategory}
                        onEditCategory={onEditCategory}
                        addNewSubCategory={addNewSubCategory}
                        setAddNewCategory={setAddNewCategory}
                        categoryNames={categoryNames}
                        currentSelectedItem={currentSelectedItem}
                        onDeleteCategory={onDeleteCategory}
                        name={name}
                        setName={setName}
                        setCurrentSelectedItem={setCurrentSelectedItem}
                        setSelectedCategory={setSelectedCategory}
                    />
                )}
                {currentSelectedItem && !addNewCategory && (
                    <CreateSubCategoryContainer
                        addNewSubCategory={addNewSubCategory}
                        categoryNames={categoryNames}
                        selectedCategory={selectedCategory}
                        subName={subName}
                        onAddSubCategory={onAddSubCategory}
                        currentSelectedItem={currentSelectedItem}
                        setAddNewSubCategory={setAddNewSubCategory}
                        setSubName={setSubName}
                    />
                )}
            </Box>
        )
    },
)
