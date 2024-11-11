import { useState, useEffect } from 'react'

// Время жизни кэша в миллисекундах
const CACHE_DURATION = 6 * 60 * 60 * 1000

interface Currency {
    ID: string
    NumCode: string
    CharCode: string
    Nominal: number
    Name: string
    Value: number
    Previous: number
}

interface CurrencyRates {
    [key: string]: Currency
}

// функция fetcher
const fetchCurrenciesRates = async () => {
    try {
        // Делаем запрос на API ЦБ РФ
        const response = await fetch(
            'https://www.cbr-xml-daily.ru/daily_json.js',
        )

        // Проверяем успешность запроса
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`)
        }

        // Читаем и возвращаем тело ответа как JSON
        return await response.json()
    } catch (error) {
        console.error('Ошибка получения курсов валют:', error)
        throw error
    }
}

// Функция для получения данных из кэша
const getCachedRates = () => {
    const cachedData = localStorage.getItem('currencyRates')
    if (!cachedData) return null

    const { rates, timestamp } = JSON.parse(cachedData)
    const now = new Date().getTime()

    // Проверяем, истекло ли время жизни кэша
    if (now - timestamp < CACHE_DURATION) {
        return { rates, timestamp } // Возвращаем кэшированные данные и время
    }

    return null // Если кэш устарел, возвращаем null
}

// Функция для сохранения данных в кэш
const cacheRates = (rates: string) => {
    const timestamp = new Date().getTime() // Сохраняем текущее время
    localStorage.setItem('currencyRates', JSON.stringify({ rates, timestamp }))
}

// Функция для форматирования даты в формат 'DD.MM.YYYY HH:mm'
const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы в JS начинаются с 0
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

// Хук для получения курсов валют на текущую дату с кэшированием
export const useCurrencyRates = () => {
    // Состояние для хранения курсов валют
    const [rates, setRates] = useState<CurrencyRates | null>(null)
    // Состояние для индикатора загрузки
    const [loading, setLoading] = useState(true)
    // Состояние для ошибок
    const [error, setError] = useState<string | null>(null)
    // Состояние для хранения времени последнего успешного запроса
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true)
            setError(null)

            // Проверяем кэш
            const cachedRates = getCachedRates()
            if (cachedRates) {
                setRates(cachedRates.rates) // Используем кэшированные курсы
                setLastUpdated(new Date(cachedRates.timestamp)) // Устанавливаем время последнего обновления
                setLoading(false)
            }

            try {
                // Попытка запроса данных с сервера
                const data = await fetchCurrenciesRates()

                const result = data?.Valute
                if (result) {
                    setRates(result) // Обновляем состояние новыми данными
                    cacheRates(result) // Кэшируем данные
                    setLastUpdated(new Date()) // Устанавливаем время последнего обновления
                } else {
                    // Если данные пустые, проверим, есть ли кэшированные данные
                    if (!cachedRates) {
                        throw new Error(
                            'Нет данных с сервера и кэш отсутствует',
                        )
                    }
                }
            } catch (error) {
                // Если запрос на сервер не удался, используем кэшированные данные
                if (cachedRates) {
                    const lastUpdateTime = new Date(
                        cachedRates.timestamp,
                    ).toLocaleString() // Форматируем время
                    setError(
                        `Ошибка получения данных с сервера. Использованы данные курса на ${lastUpdateTime}.`,
                    )
                } else {
                    setError(
                        'Ошибка получения данных. Нет кэшированных данных.',
                    )
                }
            } finally {
                setLoading(false)
            }
        }

        fetchRates() // Выполняем запрос при монтировании компонента
    }, [])

    const CHYRates = rates ? rates['CNY'].Value : null // Использования курса юаня

    return {
        rates: CHYRates,
        loading,
        error,
        lastUpdated: formatDate(new Date(lastUpdated!)),
    }
}
