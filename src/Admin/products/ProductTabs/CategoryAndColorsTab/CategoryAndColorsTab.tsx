import { memo } from 'react'
import { CategorySelectorComponent, ColorAndSizeStockComponent } from '@/Admin'
import { Box, Card } from '@mui/material'

// eslint-disable-next-line react/display-name
export const CategoryAndColorsTab = memo(() => (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Card>
            <CategorySelectorComponent />
        </Card>
        <ColorAndSizeStockComponent />
    </Box>
))
