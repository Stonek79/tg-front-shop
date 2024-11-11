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

export const ClientsList = () => {
    const handleRowClick = (
        id: Identifier,
        resource: string,
        record: RaRecord,
    ) => {
        console.log(id, resource, record, 'UsersList')
        return 'show'
    }

    return (
        <List>
            <Datagrid rowClick={handleRowClick}>
                <TextField source="id" />
                <ImageField
                    sx={{
                        '& img': {
                            maxWidth: 50,
                            maxHeight: 50,
                            objectFit: 'contain',
                        },
                    }}
                    source="image"
                    title="title"
                />
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="email" />
                <TextField sx={{ 'text-wrap': 'nowrap' }} source="phone" />
                <TextField source="username" />
                <TextField source="password" />
                <TextField source="birthDate" />
                <NumberField source="height" />
                <NumberField source="weight" />
            </Datagrid>
        </List>
    )
}
