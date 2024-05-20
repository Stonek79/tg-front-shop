'use client'

import { Admin, fetchUtils, Resource } from 'react-admin'
import {
    AdminLayout,
    ProductsList,
    ClientsList,
    ProductItem,
    CreateProduct,
    CategoriesList,
} from '@/features/Admin'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import simpleRestProvider from 'ra-data-simple-rest'
import { i18nProvider } from '@/i18nProvider'

export function AdminApp() {
    const { t } = getTranslation()
    const dataProvider = simpleRestProvider('http://localhost:4200')

    dataProvider.update = async (resource, params) => {
        const url = `http://localhost:4200/${resource}/${params.id}`
        const { json } = await fetchUtils.fetchJson(url, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        })
        return { data: json }
    }

    return (
        <Admin
            layout={AdminLayout}
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}
        >
            <Resource
                name="product"
                options={{ label: t('adminPanelLinks.goods') }}
                list={ProductsList}
                show={ProductItem}
                create={CreateProduct}
            />
            <Resource
                name="category"
                options={{ label: t('adminPanelLinks.categories') }}
                list={CategoriesList}
            />
            <Resource
                name="users"
                options={{ label: t('adminPanelLinks.users') }}
                list={ClientsList}
            />
        </Admin>
    )
}
