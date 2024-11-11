import { Box, Card } from '@mui/material'
import { memo, useCallback, useEffect, useState } from 'react'
import type { ColorAndSizeStock, SingleColor, Size } from '@/types/product'
import { VariantsComponent } from './VariantsComponent'
import {
    FieldArray,
    FieldArrayPath,
    useFieldArray,
    useFormContext,
} from 'react-hook-form'
import { ColorSection } from './ColorSection'
import { SizeSection } from './SizeSection'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { PreparedColors } from '@/types/product'
import { ErrorsField } from '@/Admin/ui'

const source = 'colorAndSizeStock' as FieldArrayPath<ColorAndSizeStock>
// eslint-disable-next-line react/display-name
export const ColorAndSizeStockComponent = memo(() => {
    const { t } = getTranslation()

    const {
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext<ColorAndSizeStock>()

    const { fields, remove, append } = useFieldArray<
        ColorAndSizeStock,
        FieldArrayPath<ColorAndSizeStock>,
        'fieldsId'
    >({
        control,
        name: source,
        keyName: 'fieldsId',
        rules: { required: t('errors.colorAndSizeRequired') },
    })

    const [selectedColors, setSelectedColors] = useState<SingleColor[]>([])
    const [selectedSizes, setSelectedSizes] = useState<Size[]>([])

    useEffect(() => {
        if (!fields) {
            return setError(source, {
                message: 'errors.colorAndSizeRequired',
            })
        }

        const colors = fields.reduce<SingleColor[]>(
            (acc, stock: ColorAndSizeStock) => {
                if (
                    !acc.find(
                        (item) =>
                            item.color === stock.color &&
                            item.image === stock.image,
                    )
                ) {
                    acc.push({
                        color: stock.color,
                        image: stock.image,
                    })
                }
                return acc
            },
            [],
        )

        setSelectedColors(colors)

        const uniqueSizes = Array.from(
            new Set<string>(
                fields
                    .map((stock: ColorAndSizeStock) => stock.size)
                    .filter(Boolean) as string[],
            ),
        ).map((size) => ({ name: size })) as Size[]

        setSelectedSizes(uniqueSizes)
    }, [])

    const setColor = useCallback(
        (color: PreparedColors) => {
            if (selectedColors.find((item) => item.color === color.id)) {
                return setSelectedColors(
                    selectedColors.filter((item) => item.color !== color.id),
                )
            }

            setSelectedColors((prev) => [...prev, color])
            if (selectedSizes.length > 0) {
                const currentVariants: ColorAndSizeStock[] = selectedSizes.map(
                    (size) => ({
                        color: color.color,
                        image: color.image,
                        size: size.name,
                        quantityInStock: 10,
                    }),
                )

                append(currentVariants as FieldArray<ColorAndSizeStock, never>)
                clearErrors()
            }
        },
        [selectedColors, selectedSizes],
    )

    const setSize = useCallback(
        (size: Size) => {
            const { name } = size
            if (selectedSizes.find((size) => size.name === name)) {
                return setSelectedSizes(
                    selectedSizes.filter((size) => size.name !== name),
                )
            }

            setSelectedSizes((prev) => [...prev, size])
            if (selectedColors.length > 0) {
                const currentVariants: ColorAndSizeStock[] = selectedColors.map(
                    (color) => ({
                        color: color.color,
                        image: color.image,
                        size: size.name,
                        quantityInStock: 10,
                    }),
                )

                append(currentVariants as FieldArray<ColorAndSizeStock, never>)
                clearErrors()
            }
        },
        [selectedSizes, selectedColors],
    )

    const removeColor = (color: string) => {
        for (let i = fields.length - 1; i >= 0; i--) {
            if ((fields as ColorAndSizeStock)[i].color === color) {
                remove(i)
            }
        }
    }

    const removeSize = (size: string) => {
        for (let i = fields.length - 1; i >= 0; i--) {
            if ((fields as ColorAndSizeStock)[i].size === size) {
                remove(i)
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
                width: '100%',
                flex: 3,
            }}
        >
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
                <Card sx={{ gap: 1, width: '100%', flexWrap: 'wrap' }}>
                    <ColorSection
                        selectedColors={selectedColors}
                        setSelectedColors={setColor}
                        remove={removeColor}
                    />
                </Card>
                <Card sx={{ gap: 1, width: '100%', flexWrap: 'wrap' }}>
                    <SizeSection
                        selectedSizes={selectedSizes}
                        setSelectedSizes={setSize}
                        remove={removeSize}
                    />
                </Card>
            </Box>
            {errors[source] ? (
                <ErrorsField source={source} errors={errors} />
            ) : (
                <VariantsComponent variants={fields} />
            )}
        </Box>
    )
})
