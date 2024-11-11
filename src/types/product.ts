export type Image = {
    rawFile: File
    src: string
    title: string
}

export type Picture = {
    id: string | number
    filename: string
    buffer?: File
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNISEX = 'UNISEX',
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export enum ShipmentStatus {
    SHIPPED = 'SHIPPED',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
}

export enum Currency {
    CNY,
    RUB,
    USD,
    EUR,
}

export type CurrencyRate = {
    id: number
    currency: Currency
    rate: number
    updatedAt: Date
}

export type Product = {
    id: string
    createdAt?: string
    updatedAt?: string
    SKU: number
    title: string
    description: string
    price: number
    priceWithDiscount?: number | null
    currency?: string | null
    discountPercentage?: number | null
    discountedPrice?: number | null
    rating?: number | null
    stock?: number | null
    thumbnail?: string | null | Image
    images: (string | Image)[]
    onSale?: boolean | null
    onTop?: boolean | null
    characteristics: Characteristics
    orders: OrderToProduct[]
    reviews: Review[]
    colorAndSizeStock: ColorAndSizeStock[]
    categories: Category[]
    productCategory: ProductCategory[]
    weight: number
}

export type SingleColor = {
    color: string
    image: string | Image
}

export type PreparedColors = {
    image: string | Image
    color: string
    name: string
    id: string
}

export type Size = {
    name: string
}

export type Color = {
    id?: string
    name: string | null
    color: string | null
    image: Image | null
}

export type ColorAndSizeStock = {
    id?: string
    fieldsId?: string
    productId?: string
    color: string
    size: string
    image: string | Image
    quantityInStock: number
}

export type Characteristics = {
    id: string
    productId: string
    brandName?: string | null
    origin?: string | null
    material?: string | null
    gender?: Gender
    style?: string | null
    fabricTexture?: string | null
    productType?: string | null
    decorativeElements?: string | null
    fit?: string | null
    length?: string | null
    fabricDensity?: string | null
    zipperType?: string | null
    fitType?: string | null
    unitOfMeasurement?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
}

export type Order = {
    id: string
    userId: string
    status: OrderStatus
    products: OrderToProduct[]
    shipment?: Shipment | null
}

export type OrderToProduct = {
    orderId: string
    productId: string
}

export type Review = {
    id: string
    productId: string
    text: string
    rating?: number | null
    photos: string[]
    userId?: string | null
}

export type Shipment = {
    id: string
    orderId: string
    shippedDate?: Date | null
    deliveredDate?: Date | null
    trackingNumber?: string | null
    status: ShipmentStatus
}

export type Category = {
    id: number
    name: string
    parent?: Category | null
    parentId?: number | null
    image?: string | null
    children: Category[]
    ProductCategory: ProductCategory[]
}

export type ProductCategory = {
    productId: string
    categoryId: number
}
