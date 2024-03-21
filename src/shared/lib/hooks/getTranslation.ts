// Fake translations for testing to get possibility to add translation to the app
// You can't switch language in the app

import ru from '../../../../public/translations/ru.json'
import en from '../../../../public/translations/en.json'

/**
 * Retrieve a nested value from a dictionary based on a given key.
 *
 * @param {string} key - The key to search for in the dictionary.
 * @param {TranslationDict} dict - The dictionary to search within.
 * @return {TranslationDict} The nested value found in the dictionary based on the key.
 */
const getDictValue = (key: string, dict: TranslationDict) =>
    key?.split('.').reduce((acc, item) => {
        acc = (acc[item] as TranslationDict) ?? {}
        return acc
    }, dict)

interface TranslationDict {
    [key: string]: string | TranslationDict
}

const dictionaries: { [key: string]: TranslationDict } = {
    ru,
    en,
}

/**
 * Generates a translation function and returns the function along with the language and dictionary.
 *
 * @param {string} path - Optional path for nested translations
 * @return {object} Object containing the translation function, language, and dictionary
 */
export const getTranslation = (path?: string) => {
    const lang = 'ru'
    const dict = dictionaries[lang]

    const firstPath: TranslationDict = path ? getDictValue(path, dict) : dict

    const t = (key: string): string => {
        const keysPath = key?.split('.')
        if (keysPath?.length === 1) {
            return firstPath[key] as string
        }
        const last = keysPath.pop()!
        const rest = keysPath.slice(0, -1).join('.')
        const result = getDictValue(rest, firstPath)

        return result[last] as string
    }

    return { t, lang, dict }
}
