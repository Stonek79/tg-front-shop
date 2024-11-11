import { Category } from '@/types/categories'
import { Alert, Box, Chip, Typography } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { memo, useEffect } from 'react'
import { CheckboxGroupInput } from 'react-admin'
import { CategoriesSelectorList } from '../CategorySelectorComponent/CategoriesSelectorList'
import { useStore } from 'ra-core'
import { FieldError, useController } from 'react-hook-form'
import { useCategoriesStore } from '@/shared/state/categories'

// eslint-disable-next-line react/display-name
const SelectedCategories = memo(
    ({
        error,
        source,
        values = [],
        onChange,
    }: {
        error?: FieldError
        source: string
        values: Category[]
        onChange: (...event: any[]) => void
    }) => {
        useEffect(() => {
            onChange(values)
        }, [onChange, values])

        if (error) {
            return <Alert color="error">{error.message}</Alert>
        }

        return (
            <CheckboxGroupInput
                source={source}
                choices={values}
                label={false}
                checked={true}
                sx={{ visibility: 'hidden', height: 0, width: 0 }}
            />
        )
    },
)

// eslint-disable-next-line react/display-name
const SelectedCategoriesList = memo(() => {
    const { t } = getTranslation()
    const [selectedCategories, setSelectedCategories] = useStore(
        'categories',
        [],
    )

    console.log(selectedCategories, 'SELECTED CATEGORIES')

    return (
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap' }}>
            {selectedCategories.length > 0 ? (
                selectedCategories.map((category: Category) => (
                    <Chip
                        key={category.id}
                        label={category.name}
                        onDelete={() =>
                            setSelectedCategories(
                                selectedCategories.filter(
                                    (selectedCategory: Category) =>
                                        selectedCategory.id !== category.id,
                                ),
                            )
                        }
                    />
                ))
            ) : (
                <Typography>{t('adminCategories.noCategories')}</Typography>
            )}
        </Box>
    )
})

const source = 'categories'

// eslint-disable-next-line react/display-name
export const CategorySelectorComponent = memo(
    ({ editable = false }: { editable?: boolean }) => {
        const { t } = getTranslation()
        const { categories, categoriesList } = useCategoriesStore()

        const [selectedCategories] = useStore('categories', [])

        const {
            field: { onChange, value },
            fieldState: { error },
        } = useController({
            name: source,
            defaultValue: selectedCategories,
            rules: { required: t('errors.categoryRequired') },
        })

        const root = categories.find(
            (category) => !category.parentIds.length,
        ) as Category

        console.log(value, 'ROOT')

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    flex: 1,
                }}
            >
                <Box sx={{ p: 2, minWidth: 300, width: 'fit-content' }}>
                    <CategoriesSelectorList
                        categories={categories}
                        category={root}
                        editable={editable}
                        categoriesList={categoriesList}
                    />
                </Box>

                {!editable && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        <Typography variant="h6">
                            {t('adminCategories.selectedCategory')}:
                        </Typography>
                        <SelectedCategoriesList />
                        <SelectedCategories
                            error={error}
                            source={source}
                            values={selectedCategories}
                            onChange={onChange}
                        />
                    </Box>
                )}
            </Box>
        )
    },
)
