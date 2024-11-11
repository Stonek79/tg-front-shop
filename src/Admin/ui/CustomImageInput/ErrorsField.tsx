import { Alert } from '@mui/material'
import {
    DeepRequired,
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    GlobalError,
} from 'react-hook-form'

type ErrorsType1 = Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
}

type ErrorsType2 = FieldError | undefined

type CombinedErrorType = ErrorsType1 | ErrorsType2

interface ErrorsFieldProps {
    source: string
    errors?: CombinedErrorType
}

export const ErrorsField = ({ source, errors }: ErrorsFieldProps) => {
    if (!errors) return null
    if (errors?.message && !Array.isArray(errors[source])) {
        return (
            <Alert sx={{ width: 'fit-content' }} severity="error">
                {errors.message}
            </Alert>
        )
    }

    if (errors[source] && !Array.isArray(errors[source])) {
        return (
            <Alert sx={{ width: 'fit-content' }} severity="error">
                {errors[source].message}
            </Alert>
        )
    }

    return (
        errors[source] &&
        errors[source].map((error, i) => (
            <Alert key={i} sx={{ width: 'fit-content' }} severity="error">
                {error?.message}
            </Alert>
        ))
    )
}
