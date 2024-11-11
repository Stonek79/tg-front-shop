/* eslint-disable */
export const validateName =
    (
        { validateValues, name }: { validateValues: string[]; name?: string },
        message: string,
    ) =>
    (value: string) => {
        const trimmedValue = value ? value.trim() : ''
        if (name && validateValues.includes(trimmedValue)) {
            return message
        } else if (!name && validateValues.includes(trimmedValue)) {
            return message
        } else {
            return undefined
        }
    }
