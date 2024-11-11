import { Create, SimpleForm, useCreate } from 'react-admin'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router'
import { memo, useEffect } from 'react'
import {
    CategoryAndColorsTab,
    CharacteristicsTab,
    CustomTabPanel,
    ImagesTab,
    MainTab,
    PriceAndStockTab,
    SwitchersTab,
    TabsList,
} from '../ProductTabs'
import { useTabState } from '@/shared/state/productTabState'
import { productSave } from '@/Admin/products/lib/productSave'
import { FieldValues } from 'react-hook-form'

// eslint-disable-next-line react/display-name
export const CreateProduct = memo(() => {
    const [create] = useCreate()
    const navigate = useNavigate()
    const setValue = useTabState.use.setValue()
    const setTitle = useTabState.use.setTitle()

    useEffect(
        () => () => {
            console.log('unmount CreateProduct')
            setValue(0)
            setTitle('')
        },
        [],
    )

    return (
        <Create>
            <SimpleForm
                mode="onChange"
                reValidateMode="onChange"
                onSubmit={(data: FieldValues) =>
                    productSave(data, 'create', { create, navigate })
                }
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabsList isCreate={true} />
                </Box>
                <CustomTabPanel index={0}>
                    <MainTab isCreate />
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
            </SimpleForm>
        </Create>
    )
})
