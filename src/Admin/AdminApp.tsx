'use client'

import { Admin, Resource } from 'react-admin'
import {
    AdminLayout,
    ProductsList,
    ClientsList,
    ProductItem,
    CreateProduct,
    CategoriesList,
    EditProduct,
    ShowCategory,
    EditCategory,
    CreateCategory,
    AddNewImage,
    ImagesList,
    ShowImage,
    CreateBanner,
    BannersList,
    EditBanner,
} from './index'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { i18nProvider } from '@/i18nProvider'
import { dataProvider } from '@/shared/lib/actions/dataProviders'
import { useEffect } from 'react'
import { apiUrl, imagesUrl } from '@/shared/consts/urls'
import { useNamesStore } from '@/shared/state/namesList'
import { useCategoriesStore } from '@/shared/state/categories'

export default function AdminApp() {
    const { t } = getTranslation()
    const { fetchNames } = useNamesStore()
    const { fetchCategories } = useCategoriesStore()

    // TODO think about rehydrate update in useNamesStore and useCategoriesStore and what about rerenders

    useEffect(() => {
        fetchNames(`${imagesUrl}names`)
        fetchNames(`${apiUrl}/categories/names`)
        fetchNames(`${apiUrl}/products/names`)
    }, [])

    useEffect(() => {
        fetchCategories(`${apiUrl}/categories`)
    }, [])

    return (
        <Admin
            layout={AdminLayout}
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}
        >
            <Resource
                name="products"
                options={{ label: t('adminPanelLinks.goods') }}
                list={ProductsList}
                show={ProductItem}
                create={CreateProduct}
                edit={EditProduct}
            />
            <Resource
                name="banners"
                options={{ label: t('adminPanelLinks.banner') }}
                create={CreateBanner}
                list={BannersList}
                edit={EditBanner}
                hasEdit
            />
            <Resource
                name="categories"
                options={{ label: t('adminPanelLinks.categories') }}
                list={CategoriesList}
                show={ShowCategory}
                edit={EditCategory}
                create={CreateCategory}
            />
            <Resource
                name="users"
                options={{ label: t('adminPanelLinks.users') }}
                list={ClientsList}
            />
            <Resource
                name="images"
                options={{ label: t('adminPanelLinks.images') }}
                list={ImagesList}
                create={AddNewImage}
                show={ShowImage}
            />
        </Admin>
    )
}
