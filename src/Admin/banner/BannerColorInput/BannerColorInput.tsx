import { useController } from 'react-hook-form'
import { TextInput } from 'react-admin'
import { MuiColorInput } from 'mui-color-input'

export const BannerColorInput = ({ name, label }) => {
    const { field } = useController({ name, defaultValue: '#fff' })

    const handleColorChange = (newColor) => {
        field.onChange(newColor)
    }

    return (
        <div>
            <TextInput
                sx={{ display: 'none' }}
                label={label}
                source={name}
                value={field.value}
            />
            <MuiColorInput
                label={label}
                format="hex"
                value={field.value}
                onChange={handleColorChange}
            />
        </div>
    )
}
