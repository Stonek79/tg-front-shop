'use client'
import {
    DeleteButton,
    Edit,
    SaveButton,
    SimpleForm,
    Toolbar,
    useEditController,
    useUpdate,
} from 'react-admin'
import { Box } from '@mui/material'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useNavigate, useParams } from 'react-router'
import {
    CategoryAndColorsTab,
    CharacteristicsTab,
    CustomTabPanel,
    ImagesTab,
    MainTab,
    OrdersTab,
    PriceAndStockTab,
    ReviewsTab,
    SwitchersTab,
    TabsList,
} from '../ProductTabs'
import {
    transformedThumbnailPath,
    transformInputImagesPath,
    transformOutputImagesPath,
} from '@/shared/lib/helpers/imageTransformers'
import { imagesUrl } from '@/shared/consts/urls'
import { productSave } from '../lib/productSave'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Product } from '@/types/product'

export const EditProduct = () => {
    const { t } = getTranslation()
    const [edit] = useUpdate()
    const navigate = useNavigate()

    const { id } = useParams()

    const { record, isPending, refetch } = useEditController({
        resource: 'products',
        id,
        mutationMode: 'optimistic',
        queryOptions: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            staleTime: 60 * 60 * 1000,
            gcTime: 60 * 60 * 1000,
        },
    })

    if (isPending || !record) return null

    const ProductTitle = () => (
        <span>{`${t('product.productName')}: ${record.title}`}</span>
    )

    const EditToolbar = () => (
        <Toolbar>
            <SaveButton alwaysEnable />
            <DeleteButton />
        </Toolbar>
    )

    console.log(record, 'RECORD')
    return (
        <Edit mutationMode="optimistic" title={<ProductTitle />}>
            <SimpleForm
                mode="onChange"
                reValidateMode="onChange"
                toolbar={<EditToolbar />}
                warnWhenUnsavedChanges
                record={{
                    ...record,
                    characteristics: record?.characteristics
                        ? [record?.characteristics].flat()
                        : undefined,
                    thumbnail: transformedThumbnailPath(
                        record?.thumbnail,
                        imagesUrl,
                        record,
                    ),
                    images: transformInputImagesPath(record?.images, imagesUrl),
                }}
                onSubmit={
                    ((
                        data: FieldValues extends Product ? FieldValues : never,
                    ) => {
                        const transformedData = transformOutputImagesPath(data)

                        return productSave(transformedData, 'edit', {
                            edit,
                            refetch,
                            navigate,
                        })
                    }) as SubmitHandler<FieldValues>
                }
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabsList />
                </Box>
                <CustomTabPanel index={0}>
                    <MainTab />
                </CustomTabPanel>
                <CustomTabPanel index={1}>
                    <CategoryAndColorsTab />
                </CustomTabPanel>
                <CustomTabPanel index={2}>
                    <PriceAndStockTab />
                </CustomTabPanel>
                <CustomTabPanel index={3}>
                    <SwitchersTab />
                </CustomTabPanel>
                <CustomTabPanel index={4}>
                    <ImagesTab />
                </CustomTabPanel>
                <CustomTabPanel index={5}>
                    <CharacteristicsTab />
                </CustomTabPanel>
                <CustomTabPanel index={6}>
                    <OrdersTab />
                </CustomTabPanel>
                <CustomTabPanel index={7}>
                    <ReviewsTab />
                </CustomTabPanel>
            </SimpleForm>
        </Edit>
    )
}
