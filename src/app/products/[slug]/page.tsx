import {products} from "@/lib/consts/products";
import {ProductItem} from "@/components/ProductItem/ProductItem";

interface ArticleProps {
    params: { slug: string }
}
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.id,
    }))
}
export default async function Product({params: {slug}}: ArticleProps) {
    const product = products.filter((product) => product.id === slug)[0];

return <ProductItem product={product} />
}
