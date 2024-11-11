'use client'
import {
    NumberField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin'
import { CustomImageField } from '@/Admin/ui'

export const ProductItem = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <CustomImageField
                source="thumbnail"
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: 'contain',
                    borderRadius: 4,
                }}
            />
            <TextField source="category" />
            <TextField source="title" />
            <RichTextField source="description" />
            <TextField source="brand" />
            <NumberField source="price" />
            <NumberField source="discountPercentage" />
            <NumberField source="rating" />
            <NumberField source="stock" />
        </SimpleShowLayout>
    </Show>
)
