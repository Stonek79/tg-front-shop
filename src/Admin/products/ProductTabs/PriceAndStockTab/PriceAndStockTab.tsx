import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { useCustomWatch } from '@/shared/lib/hooks/useCustomWatch'
import { useController, useForm } from 'react-hook-form'
import { memo, useEffect } from 'react'
import {
    Alert,
    Box,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Rating,
    TextField,
    Typography,
} from '@mui/material'
import { NumberInput, useInput } from 'react-admin'
import { useRateState } from '@/shared/state/currencyRate'

const PriceWithDiscount = ({ checked }: { checked: boolean }) => {
    const { t } = getTranslation()
    const {
        currencyRate: { rate },
    } = useRateState()
    const price = useCustomWatch<{ price: number }, 'price'>({ name: 'price' })
    const discountPercentage = useCustomWatch<
        { discountPercentage: number },
        'discountPercentage'
    >({ name: 'discountPercentage' })
    const {
        field: { onChange },
    } = useController({
        name: 'priceWithDiscount',
        defaultValue: price | 0,
    })

    const validPrice = price ? parseFloat(String(price)) : 0

    const validDiscountPercentage = discountPercentage
        ? parseFloat(String(discountPercentage))
        : 0

    const calculatedPriceWithDiscount =
        validPrice && validDiscountPercentage
            ? Math.round((validPrice * (100 - validDiscountPercentage)) / 100)
            : validPrice

    useEffect(() => {
        onChange(calculatedPriceWithDiscount)
    }, [calculatedPriceWithDiscount, onChange])

    return (
        <>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <NumberInput
                    required
                    sx={{ width: 200 }}
                    label={t('product.price')}
                    source={'price'}
                    format={(v) => parseFloat(v).toFixed(2)}
                    min={0}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">¥</InputAdornment>
                        ),
                    }}
                />
                <NumberInput
                    sx={{ width: 200 }}
                    label={t('product.discountPercentage')}
                    source={'discountPercentage'}
                    min={0}
                    max={99}
                    step={1}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                        ),
                    }}
                />
                <NumberInput
                    required
                    sx={{ width: 200 }}
                    label={t('product.priceWithDiscount')}
                    source="priceWithDiscount"
                    format={(v) => parseFloat(v).toFixed(2)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">¥</InputAdornment>
                        ),
                    }}
                />
            </Box>
            {checked && rate && (
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <TextField
                        required
                        sx={{ width: 200 }}
                        label={t('product.price')}
                        value={parseFloat(String(price * rate)).toFixed(2)}
                        disabled
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    ₽
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ width: 200 }}
                        label={t('product.discountPercentage')}
                        disabled
                        value={parseFloat(String(discountPercentage))}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    %
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        required
                        sx={{ width: 200 }}
                        label={t('product.priceWithDiscount')}
                        disabled
                        value={parseFloat(
                            String(calculatedPriceWithDiscount * rate),
                        ).toFixed(2)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    ₽
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            )}
            {checked && !rate && (
                <Alert severity="error">
                    Не получены данные курса юаня. Пересчет невозможен
                </Alert>
            )}
        </>
    )
}

const StarInput = ({
    source,
    label,
    value,
}: {
    source: string
    label: string
    value: number
}) => {
    // eslint-disable-next-line react/display-name
    const { field, fieldState } = useInput<string>({ source })
    return (
        <Box
            sx={{
                display: 'inline-flex',
                position: 'relative',
                width: 300,
                flexDirection: 'column',
                mt: 1,
                mp: 0.5,
            }}
        >
            <Typography
                sx={{ position: 'absolute', top: 5, left: 16 }}
                fontSize={'12px'}
            >
                {label} - {value}
            </Typography>
            <input {...field} hidden />
            <Rating
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    pt: 2.5,
                    pb: 0.5,
                    pr: 1.5,
                    pl: 1.5,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '4px 4px 0 0',
                }}
                size="medium"
                name="read-only"
                value={value}
                precision={0.1}
                readOnly
            />
            <Typography
                sx={{
                    mt: 0.5,
                    mr: 1.75,
                    mb: 0,
                    ml: 1.75,
                }}
            >
                {fieldState?.error?.message}
            </Typography>
        </Box>
    )
}

const RusSelect = ({ control, name }: { control: any; name: string }) => {
    const {
        field: { onChange, value, ref },
    } = useController({
        name,
        control,
        defaultValue: false,
    })

    return (
        <Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                        inputRef={ref}
                    />
                }
                label="RUB"
                labelPlacement="end"
            />
        </Box>
    )
}

// eslint-disable-next-line react/display-name
export const PriceAndStockTab = memo(() => {
    const { t } = getTranslation()
    const { currencyRate } = useRateState()
    const rate = useCustomWatch<{ rating: number }, 'rating'>({
        name: 'rating',
    })

    const { control } = useForm({
        defaultValues: {
            currencies: false,
        },
    })

    const checked = useCustomWatch({
        control,
        name: 'currencies',
    })

    console.log(currencyRate, 'currancyRate')
    return (
        <Box>
            <Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <RusSelect control={control} name={'currencies'} />
                </Box>
                <PriceWithDiscount checked={checked} />
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <StarInput
                    value={rate}
                    label={t('product.rating')}
                    source="rating"
                />
                <NumberInput
                    required
                    sx={{ width: 300 }}
                    min={0}
                    label={t('product.stock')}
                    source={'stock'}
                />
            </Box>
            {/*<Box>*/}
            {/*    <Typography variant="h6">*/}
            {/*        {`Курс Юаня на текущую дату - ${lastUpdated}`}*/}
            {/*    </Typography>*/}
            {/*    {loading && <Alert severity="info">Загрузка...</Alert>}*/}
            {/*    {error && <Alert severity="error">{error}</Alert>}*/}
            {/*    {!rates && (*/}
            {/*        <Alert severity="error">*/}
            {/*            `Получены некорректные данные курса юаня: ${rates}`*/}
            {/*        </Alert>*/}
            {/*    )}*/}
            {/*    {rates && <pre>{`CNY: ${rates} рублей за 1 юань`}</pre>}*/}
            {/*</Box>*/}
        </Box>
    )
})
