'use client'

import { Admin, Resource } from 'react-admin'
import {
    AdminLayout,
    ProductsList,
    ClientsList,
    ProductItem,
} from '@/features/Admin'
import { DataProviders } from '@/shared/lib/actions/dataProviders'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'

export function AdminApp() {
    const { t } = getTranslation()
    return (
        <Admin layout={AdminLayout} dataProvider={DataProviders}>
            <Resource
                name="products"
                options={{ label: t('adminPanelLinks.goods') }}
                list={ProductsList}
                show={ProductItem}
            />
            <Resource
                name="users"
                options={{ label: t('adminPanelLinks.users') }}
                list={ClientsList}
            />
        </Admin>
    )
}
