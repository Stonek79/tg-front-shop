'use client'
import {
    ImageField,
    NumberField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin'

export const ProductItem = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ImageField
                sx={{
                    '& img': {
                        maxWidth: 100,
                        maxHeight: 100,
                        objectFit: 'contain',
                    },
                }}
                source="thumbnail"
                title="title"
            />
            <TextField source="category" />
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="brand" />
            <NumberField source="price" />
            <NumberField source="discountPercentage" />
            <NumberField source="rating" />
            <NumberField source="stock" />
        </SimpleShowLayout>
    </Show>
)
