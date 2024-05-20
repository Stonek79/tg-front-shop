import * as React from 'react'
import Box from '@mui/material/Box'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { Card, Typography } from '@mui/material'
import {
    Button,
    DeleteWithConfirmButton,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    useCreate,
    useDelete,
    useUpdate,
} from 'react-admin'
import { ChangeEvent, memo, useMemo, useState } from 'react'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useNavigate } from 'react-router'

interface Item {
    id: number
    name: string
    parentId: number | null
    children?: Item[]
    parent?: Item
}

interface ItemWithChildren extends Item {
    children: ItemWithChildren[]
}

export const buildItemsTree = (items: Item[]): ItemWithChildren[] => {
    const map: { [key: number]: number } = {}
    let node: ItemWithChildren
    const roots: ItemWithChildren[] = []
    for (let i = 0; i < items.length; i += 1) {
        map[items[i].id] = i // initialize the map
        items[i].children = [] // initialize the children
    }
    for (let i = 0; i < items.length; i += 1) {
        node = items[i] as ItemWithChildren
        if (node.parentId !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            items[map[node?.parentId]]?.children?.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}

const validateName = (validateValues: string[]) => (value: string) =>
    validateValues.includes(value) ? 'Name is must be unique' : undefined

const CategoryEditToolbar = ({
    labels,
    id,
    name,
    onSave,
    onDelete,
}: {
    labels: {
        [key: string]: string
    }
    id: number
    name: string
    onSave: () => void
    onDelete: () => void
}) => (
    <Toolbar
        sx={{
            justifyContent: 'space-between',
            '&.MuiToolbar-root': { p: 1, minHeight: 'auto' },
        }}
    >
        <SaveButton
            size="small"
            type="button"
            label={labels.save}
            name={labels.save}
            onClick={onSave}
        />
        <DeleteWithConfirmButton
            record={{ id }}
            onSubmit={(e) => {
                e.preventDefault()
                onDelete()
            }}
            label={labels.delete}
            size="small"
            translateOptions={{
                name: 'ra.message.delete_content',
            }}
            confirmTitle={`${labels.confirmDeleteTitle} ${name.toUpperCase()}`}
            confirmContent={labels.confirmDeleteContent}
            confirmColor="warning"
        />
    </Toolbar>
)

// eslint-disable-next-line react/display-name
export const CreateAndEditCategories = memo(
    ({ items, refetch }: { items: Item[]; refetch: () => void }) => {
        const { t } = getTranslation()
        const itemsTree = useMemo(() => buildItemsTree(items), [items])
        const [selectedCategory, setSelectedCategory] = useState<Item | null>(
            null,
        )
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
            event: React.SyntheticEvent,
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
            console.log('delete', selectedCategory?.id)
            deleteOne(
                'category',
                { id: selectedCategory?.id },
                {
                    onSuccess: () => {
                        refetch()
                        navigate('/category')
                        setSelectedCategory(null)
                        setCurrentSelectedItem(null)
                    },
                },
            )
        }
        console.log(selectedCategory?.id, 'editContext')
        return (
            <Box sx={{ display: 'flex', gap: 2, width: '100%', m: 2 }}>
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
                        <Typography variant="h6">
                            {t('adminCategories.currentCategories')}
                        </Typography>
                        <RichTreeView
                            items={itemsTree}
                            onItemSelectionToggle={handleItemSelectionToggle}
                            multiSelect
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
                            <SimpleForm
                                onSubmit={onAddCategory}
                                id="addNewCategory"
                            >
                                <TextInput
                                    validate={[validateName(categoryNames)]}
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
                            onClick={() => setAddNewCategory(!addNewCategory)}
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
                {selectedCategory && (
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
                                    id={selectedCategory?.id}
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
                                        validate={[validateName(categoryNames)]}
                                        disabled={addNewSubCategory}
                                        value={name}
                                        inputProps={{ value: name }}
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            setName(event.target.value)
                                        }}
                                        label={t(
                                            'adminCategories.categoryName',
                                        )}
                                        source="name"
                                    />
                                    {selectedCategory?.parentId && (
                                        <Box>
                                            <Typography>
                                                {t(
                                                    'adminCategories.parentCategory',
                                                )}
                                                :
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
                            }}
                        >
                            <>{t('buttons.cancel')}</>
                        </Button>
                    </Card>
                )}
                {currentSelectedItem && !addNewCategory && (
                    <Card
                        sx={{
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: addNewSubCategory
                                ? 'inherit'
                                : 'fit-content',
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
                                                {t(
                                                    'adminCategories.categoryName',
                                                )}
                                                :
                                            </Typography>
                                            <TextInput
                                                validate={[
                                                    validateName(categoryNames),
                                                ]}
                                                value={subName}
                                                onChange={(
                                                    event: ChangeEvent<HTMLInputElement>,
                                                ) => {
                                                    setSubName(
                                                        event.target.value,
                                                    )
                                                }}
                                                label={t(
                                                    'adminCategories.categoryName',
                                                )}
                                                source="subname"
                                            />
                                            <Box>
                                                <Typography>
                                                    {t(
                                                        'adminCategories.parentCategory',
                                                    )}
                                                    :
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
                                onClick={() =>
                                    setAddNewSubCategory(!addNewSubCategory)
                                }
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
                )}
            </Box>
        )
    },
)
