'use client'
import {
    ArrayField,
    ChipField,
    Datagrid,
    Identifier,
    List,
    NumberField,
    Pagination,
    RaRecord,
    RichTextField,
    SingleFieldList,
    TextField,
    useFieldValue,
} from 'react-admin'
import { CustomImageField } from '@/Admin/ui'

const WeightTextField = (props: { source: string }) => {
    const value = useFieldValue(props)
    const formatted = Number(value).toFixed(1).toString()
    return <TextField record={{ weight: formatted }} source="weight" />
}

const ProductCategoriesList = ({ source }: { source: string }) => (
    <ArrayField source={source}>
        <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
        </SingleFieldList>
    </ArrayField>
)

export const ProductsList = () => {
    const PostPagination = () => (
        <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
    )

    const handleRowClick = (
        id: Identifier,
        resource: string,
        record: RaRecord,
    ) => {
        console.log(id, resource, record, 'ProductsList')

        return 'edit'
    }

    return (
        <List perPage={10} pagination={<PostPagination />}>
            <Datagrid rowClick={handleRowClick}>
                <TextField source="SKU" label="SKU" />
                <CustomImageField source="thumbnail" />
                <ProductCategoriesList source="categories" />
                <TextField source="title" />
                <RichTextField source="description" />
                <WeightTextField source="weight" />
                <NumberField source="price" />
                <NumberField source="priceWithDiscount" textAlign="center" />
                <TextField source="currency" />
                <NumberField source="discountPercentage" textAlign="center" />
                <NumberField source="rating" />
                <NumberField source="stock" />
            </Datagrid>
        </List>
    )
}
