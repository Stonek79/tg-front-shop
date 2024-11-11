import {
    ArrayInput,
    SelectInput,
    SimpleFormIterator,
    TextInput,
} from 'react-admin'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Genders } from '@/shared/consts/gender'
import { memo } from 'react'
import { Box } from '@mui/material'
import { Characteristics } from '@/types/product'

function arePropsEqual(oldProps, newProps) {
    const newValues = Object.values(newProps)
    return Object.values(oldProps).every(
        (oldProp, index) => oldProp === newValues[index],
    )
}

// eslint-disable-next-line react/display-name
export const Characteristics = memo(
    ({
        record,
    }: {
        record: Omit<
            Characteristics,
            'id' | 'createdAt' | 'updatedAt' | 'productId'
        >
    }) => {
        const { t } = getTranslation()

        return (
            <ArrayInput
                label={false}
                source={'characteristics'}
                defaultValue={record}
            >
                <SimpleFormIterator
                    disableRemove
                    disableReordering
                    disableAdd
                    disableClear
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <TextInput
                            sx={{ width: 300 }}
                            source={'brandName'}
                            label={t('characteristics.brandName')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'origin'}
                            label={t('characteristics.origin')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'material'}
                            label={t('characteristics.material')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'style'}
                            label={t('characteristics.style')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'fabricTexture'}
                            label={t('characteristics.fabricTexture')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'productType'}
                            label={t('characteristics.productType')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'decorativeElements'}
                            label={t('characteristics.decorativeElements')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'fit'}
                            label={t('characteristics.fit')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'length'}
                            label={t('characteristics.length')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'fabricDensity'}
                            label={t('characteristics.fabricDensity')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'zipperType'}
                            label={t('characteristics.zipperType')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'fitType'}
                            label={t('characteristics.fitType')}
                            defaultValue=""
                        />
                        <TextInput
                            sx={{ width: 300 }}
                            source={'unitOfMeasurement'}
                            label={t('characteristics.unitOfMeasurement')}
                            defaultValue=""
                        />
                        <SelectInput
                            sx={{ width: 300 }}
                            source={'gender'}
                            label={t('characteristics.gender')}
                            choices={Genders}
                            defaultValue={
                                record.gender ?? [
                                    Genders.find(({ id }) => id === 'UNISEX')
                                        ?.id,
                                ]
                            }
                        />
                    </Box>
                </SimpleFormIterator>
            </ArrayInput>
        )
    },
    arePropsEqual,
)
