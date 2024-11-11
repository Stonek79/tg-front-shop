import { Control, FieldValues, useWatch } from 'react-hook-form'

export type UseCustomWatchOptions<
    TFieldValues extends FieldValues,
    TName extends keyof TFieldValues,
> = {
    name: TName
    control?: Control<TFieldValues>
    defaultValue?: TFieldValues[TName]
    disabled?: boolean
    exact?: boolean
}

export function useCustomWatch<
    TFieldValues extends FieldValues,
    TName extends keyof TFieldValues,
>(options: UseCustomWatchOptions<TFieldValues, TName>): TFieldValues[TName] {
    const { control, defaultValue, disabled, exact, name } = options

    const value = useWatch({
        control,
        defaultValue,
        disabled,
        exact,
        name,
    })

    return value
}
