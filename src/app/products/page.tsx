import { ProductsList } from '@/widgets/ProductsList'
import { Product } from '@/types/product'
import { getProducts } from '@/shared/lib/actions/products'
import { productsUrl } from '@/shared/consts/products'

export default async function Products() {
    const products: Product[] = await getProducts(productsUrl)

    return <ProductsList products={products} />
}
