import { CreateButton, SimpleForm, TopToolbar } from 'react-admin'
import { CategorySelectorComponent } from '@/Admin'
import { Card } from '@mui/material'

export const CategoriesList = () => (
    <Card>
        <TopToolbar>
            <CreateButton />
        </TopToolbar>
        <SimpleForm sx={{ mt: 2 }} toolbar={false}>
            <CategorySelectorComponent editable />
        </SimpleForm>
    </Card>
)
