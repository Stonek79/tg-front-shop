import { memo } from 'react'
import {
    Datagrid,
    DateField,
    FunctionField,
    ReferenceManyField,
    RichTextField,
    TextField,
    useRecordContext,
    WithRecord,
} from 'react-admin'
import { Product } from '@/types/product'
import { Box, Rating } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

// eslint-disable-next-line react/display-name
export const Reviews = memo(() => {
    const { t } = getTranslation()
    const record = useRecordContext<Product>()

    if (!record?.reviews) {
        return (
            <FunctionField
                label="No_reviews"
                render={() => `${t('product.noReviews')}`}
            />
        )
    }

    return (
        <Box>
            <ReferenceManyField
                reference="reviews"
                target="productId"
                label={t('product.reviews')}
                perPage={10}
            >
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="productId" />
                    <DateField source="published_at" />
                    <RichTextField source="text" />
                    <WithRecord
                        render={(record) => (
                            <Rating
                                value={record?.rating}
                                name="rating"
                                defaultValue={0}
                                precision={0.1}
                                readOnly
                            />
                        )}
                    />
                </Datagrid>
            </ReferenceManyField>
        </Box>
    )
})
