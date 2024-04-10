export default async function Category({
    params: { slug },
}: {
    params: { slug: string }
}) {
    console.log(slug)
    return <div>{slug}</div>
}
