import { Characteristics as ProductCharacteristics } from '@/types/product'
import {
    ArrayInput,
    CheckboxGroupInput,
    NumberInput,
    SimpleFormIterator,
    TextInput,
} from 'react-admin'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { Genders } from '@/shared/consts/gender'
import { useState } from 'react'

export const Characteristics = (props: ProductCharacteristics) => {
    const { t } = getTranslation()
    const [addNewCharacteristics, setAddNewCharacteristics] = useState(false)

    return (
        <ArrayInput
            label={t('product.characteristics')}
            source={'characteristics'}
            onClick={() => setAddNewCharacteristics(true)}
        >
            <SimpleFormIterator
                sx={{
                    '& .RaSimpleFormIterator-form': {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 2,
                    },
                    '& .RaSimpleFormIterator-add': {
                        display: addNewCharacteristics ? 'none' : 'block',
                    },
                }}
                disableRemove
                disableReordering
            >
                <TextInput
                    source={'brandName'}
                    label={t('characteristics.brandName')}
                />
                <TextInput
                    source={'origin'}
                    label={t('characteristics.origin')}
                />
                <TextInput
                    source={'material'}
                    label={t('characteristics.material')}
                />
                <TextInput
                    source={'style'}
                    label={t('characteristics.style')}
                />
                <TextInput
                    source={'fabricTexture'}
                    label={t('characteristics.fabricTexture')}
                />
                <TextInput
                    source={'productType'}
                    label={t('characteristics.productType')}
                />
                <TextInput
                    source={'decorativeElements'}
                    label={t('characteristics.decorativeElements')}
                />
                <TextInput source={'fit'} label={t('characteristics.fit')} />
                <TextInput
                    source={'length'}
                    label={t('characteristics.length')}
                />
                <TextInput
                    source={'fabricDensity'}
                    label={t('characteristics.fabricDensity')}
                />
                <TextInput
                    source={'zipperType'}
                    label={t('characteristics.zipperType')}
                />
                <TextInput
                    source={'fitType'}
                    label={t('characteristics.fitType')}
                />
                <TextInput
                    source={'unitOfMeasurement'}
                    label={t('characteristics.unitOfMeasurement')}
                />
                <NumberInput
                    source={'quantity'}
                    label={t('characteristics.quantity')}
                />
                <CheckboxGroupInput
                    source={'gender'}
                    label={t('characteristics.gender')}
                    choices={Genders}
                />
            </SimpleFormIterator>
        </ArrayInput>
    )
}
