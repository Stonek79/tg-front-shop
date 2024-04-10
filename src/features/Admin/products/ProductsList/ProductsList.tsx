'use client'
import {
    Datagrid,
    Identifier,
    ImageField,
    List,
    NumberField,
    RaRecord,
    TextField,
} from 'react-admin'

export const ProductsList = () => {
    const handleRowClick = (
        id: Identifier,
        resource: string,
        record: RaRecord,
    ) => {
        console.log(id, resource, record, 'ProductsList')

        return 'show'
    }

    return (
        <List>
            <Datagrid rowClick={handleRowClick}>
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
            </Datagrid>
        </List>
    )
}
