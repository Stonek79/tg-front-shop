import { ProductsList } from '@/widgets/ProductsList'
import { Product } from '@/types/product'
import { getProducts } from '@/shared/lib/actions/products'

export default async function Products() {
    const { data: products, total }: { data: Product[]; total: number } =
        await getProducts(`products`, {
            limit: 10,
            page: 1,
        })

    return <ProductsList products={products} total={total} />
}
