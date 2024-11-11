export const formatPrice = (
    price: number,
    currency: string = 'RUB',
    fraction = 0,
) =>
    price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction,
    })
