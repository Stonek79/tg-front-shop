import {products} from "@/lib/consts/products";

interface ArticleProps {
    params: { slug: string }
}
export async function generateStaticParams() {

    return products.map((product) => ({
        slug: product.id,
    }))
}
export default async function ProductItem() {

}
