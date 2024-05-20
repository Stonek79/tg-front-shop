import { useGetList } from 'react-admin'

import { Card, Typography } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { CreateAndEditCategories } from '../CreateAndEditCategories/CreateAndEditCategories'

export const CategoriesList = () => {
    const { t } = getTranslation()
    const {
        data: categories,
        isSuccess,
        isLoading,
        refetch: refetchCategories,
    } = useGetList(
        'category',
        {},
        {
            optimisticResults: true,
        },
    )

    return (
        isSuccess &&
        !isLoading && (
            <Card sx={{ p: 2 }}>
                <Typography variant="h5">
                    {t('adminPanelLinks.categoryBlockTitle')}
                </Typography>
                <CreateAndEditCategories
                    items={categories}
                    refetch={refetchCategories}
                />
            </Card>
        )
    )
}
