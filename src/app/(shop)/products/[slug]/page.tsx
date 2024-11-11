import { Product } from '@/types/product'
import { getProduct, getProducts } from '@/shared/lib/actions/products'
import { ProductPage } from '@/widgets/ProductPage'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    const { data: products }: { data: Product[]; total: number } =
        await getProducts(`products`, {
            limit: 10,
            page: 1,
        })

    return products.map((product) => ({
        slug: `${product.id}`,
    }))
}

export default async function Product({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const product: Product = await getProduct(`products`, slug)

    return <ProductPage product={product} />
}
