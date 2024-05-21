import {
    ArrayInput,
    BooleanInput,
    Create,
    ImageField,
    ImageInput,
    NumberInput,
    SelectInput,
    SimpleFormIterator,
    TabbedForm,
    TextInput,
    useGetList,
} from 'react-admin'
import { Box, InputAdornment, Paper } from '@mui/material'
import { colors } from '@/shared/consts/colors'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { sizes } from '@/shared/consts/sizes'
import { Characteristics } from '../Characteristics/Characteristics'
import * as React from 'react'
import { CategoriesTreeView } from '@/features/Admin/Categories/CategoriesTree/CategoriesTree'
import { Category } from '@/types/categories'
import { buildCategoriesTree } from '@/shared/lib/helpers/categoriesTreeBuilder'

const preparedSizes = sizes.map((size) => ({ id: size, name: size }))

export const CreateProduct = () => {
    const { t } = getTranslation()
    const { data = [] } = useGetList('category')
    const categories = buildCategoriesTree(data as Category[])
    const preparedColors = Object.keys(colors).map(
        (color): { id: string; name: string | null; color: string | null } => ({
            id: color,
            name: t(`colors.${color}`),
            color: colors[color],
        }),
    )

    const ColoredField = ({ value }: { value: (typeof preparedColors)[0] }) => (
        <Paper
            elevation={1}
            sx={{
                width: 'fit-content',
                px: 0.5,
                py: 0.2,
                border: `3px solid ${value.color}`,
                margin: '5px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {value.name}
                <Paper
                    sx={{
                        width: '20px',
                        height: '20px',
                        bgcolor: value.color,
                    }}
                />
            </Box>
        </Paper>
    )

    return (
        <Create>
            <TabbedForm onSubmit={(data) => console.log(data)}>
                <TabbedForm.Tab label={t('product.mainInfo')}>
                    <TextInput
                        required
                        sx={{ width: '100%' }}
                        label={t('product.title')}
                        source={'title'}
                    />
                    <TextInput
                        required
                        sx={{ width: '100%' }}
                        label={t('product.description')}
                        multiline
                        rows={10}
                        source={'description'}
                    />
                    <TextInput
                        sx={{ width: '100%' }}
                        label={t('product.brand')}
                        source={'brand'}
                    />
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label={`${t('product.category')}/${t('product.color')}/${t('product.size')}`}
                >
                    <CategoriesTreeView
                        treeItems={categories as Category[]}
                        getItemId={(item: Category) => item.id.toString()}
                        getItemLabel={(item: Category) => item.name}
                    />
                    <ArrayInput
                        source={'colorAndSizeStock'}
                        label={`${t('product.color')} & ${t('product.size')}`}
                    >
                        <SimpleFormIterator
                            getItemLabel={(index) => `#${index + 1}`}
                            inline
                        >
                            <SelectInput
                                required
                                source={'color'}
                                label={t('product.color')}
                                choices={preparedColors}
                                optionText={(
                                    value: (typeof preparedColors)[0],
                                ) => <ColoredField value={value} />}
                            />
                            <SelectInput
                                required
                                label={t('product.size')}
                                choices={preparedSizes}
                                source={'size'}
                            />
                            <NumberInput
                                required
                                label={t('product.stock')}
                                min={0}
                                max={100}
                                source={'quantityInStock'}
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label={`${t('product.price')}/${t('product.rating')}/${t('product.stock')}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                >
                    <NumberInput
                        required
                        sx={{ minWidth: 300 }}
                        label={t('product.price')}
                        source={'price'}
                        min={0}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    ₽
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        sx={{ minWidth: 300 }}
                        label={t('product.discountPercent')}
                        source={'discountPercent'}
                        min={0}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        sx={{ minWidth: 300 }}
                        label={t('product.rating')}
                        source={'rating'}
                        min={1}
                        max={5}
                        step={0.01}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        required
                        sx={{ minWidth: 300 }}
                        min={0}
                        label={t('product.stock')}
                        source={'stock'}
                    />
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label={t('product.status')}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                >
                    <BooleanInput
                        source={'onSale'}
                        label={t('product.onSale')}
                    />
                    <BooleanInput source={'onTop'} label={t('product.onTop')} />
                    <BooleanInput
                        source={'inStock'}
                        label={t('product.inStock')}
                    />
                </TabbedForm.Tab>
                <TabbedForm.Tab label={t('product.images')}>
                    <ImageInput
                        source="thumbnail"
                        label={t('product.thumbnail')}
                        placeholder={t('product.addImage')}
                    >
                        <ImageField
                            sx={{
                                '& img': {
                                    maxWidth: 450,
                                    maxHeight: 450,
                                    minWidth: 250,
                                    minHeight: 250,
                                    objectFit: 'contain',
                                },
                            }}
                            source="src"
                            title="title"
                        />
                    </ImageInput>
                    <ImageInput
                        multiple
                        source="images"
                        label={t('product.images')}
                        placeholder={t('product.addImage')}
                    >
                        <ImageField
                            sx={{
                                '& img': {
                                    maxWidth: 250,
                                    maxHeight: 250,
                                    minWidth: 150,
                                    minHeight: 150,
                                    objectFit: 'contain',
                                },
                            }}
                            source="src"
                            title="title"
                        />
                    </ImageInput>
                </TabbedForm.Tab>
                <TabbedForm.Tab label={t('product.characteristics')}>
                    <Characteristics />
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    )
}
