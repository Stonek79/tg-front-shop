// Fake translations for testing to get possibility to add translation to the app
// You can't switch language in the app

import ru from '../../../../public/translations/ru.json'
import en from '../../../../public/translations/en.json'

interface TranslationDict {
    [key: string]: string | TranslationDict
}

const dictionaries: { [key: string]: TranslationDict } = {
    ru,
    en,
}

function getDictionaryValue(
    key: string,
    dict: TranslationDict,
): string | TranslationDict {
    const keys = key.split('.')
    let result: string | TranslationDict = dict

    for (const k of keys) {
        if (typeof result === 'string') {
            throw new Error(`Cannot access property ${k} of string`)
        }
        result = result[k]
    }

    return result
}

export const getTranslation = () // lang: string = 'ru',
: {
    t: (key: string) => string
    lang: string
    dict: TranslationDict
} => {
    const lang = 'ru'
    const dict: TranslationDict = dictionaries[lang]

    if (!dict) {
        throw new Error(`No dictionary found for language: ${lang}`)
    }

    const t = (key: string): string => {
        const result = getDictionaryValue(key, dict)

        if (typeof result === 'string') {
            return result
        } else {
            return `Expected string but got object for key: ${key}`
        }
    }

    return { t, lang, dict }
}
