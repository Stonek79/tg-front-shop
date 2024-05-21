export const validateName =
    (validateValues: string[], message: string) => (value: string) =>
        validateValues.includes(value) ? message : undefined
