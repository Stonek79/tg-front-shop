export type Product = {
    id: string
    title: string
    price: number
    currency?: string
    description: string
    discountPercentage?: number
    rating?: number
    stock?: number
    brand?: string
    category?: string
    thumbnail?: string
    images?: string[]
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNISEX = 'UNISEX',
}

export type Characteristics = {
    brandName?: string
    origin?: string
    material?: string
    gender?: Gender
    style?: string
    fabricTexture?: string
    productType?: string
    decorativeElements?: string
    fit?: string
    length?: string
    fabricDensity?: string
    closureType?: string
    fitType?: string
    unitOfMeasurement?: string
    quantity?: number
}
