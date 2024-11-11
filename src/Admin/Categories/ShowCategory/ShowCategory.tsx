import {
    EditButton,
    ListButton,
    Show,
    SimpleShowLayout,
    TopToolbar,
    useShowController,
} from 'react-admin'
import { Box, Container } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import type { Category } from '@/types/categories'
import { SubcategoriesContainer } from './SubcategoriesContainer'
import { SelectedCategoryContainer } from './SelectedCategoryContainer'
import { ParentCategoryContainer } from './ParentCategoryContainer'
import { ProductsCategoryContainer } from './ProductsCategoryContainer'

export const ShowCategory = () => {
    const { t } = getTranslation()
    const { record } = useShowController<Category>()

    if (!record) return null

    const Actions = () => (
        <TopToolbar>
            <EditButton />
            <ListButton />
        </TopToolbar>
    )

    return (
        <Show
            title={`${t('category.category')}: ${record.name}`}
            actions={<Actions />}
        >
            <SimpleShowLayout>
                <Container
                    sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            p: 0,
                            width: '100%',
                        }}
                    >
                        <SelectedCategoryContainer record={record} />
                        <ParentCategoryContainer record={record} />
                        <ProductsCategoryContainer record={record} />
                    </Box>
                    <SubcategoriesContainer record={record} />
                </Container>
            </SimpleShowLayout>
        </Show>
    )
}
