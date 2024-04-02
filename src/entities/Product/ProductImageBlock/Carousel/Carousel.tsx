import cls from './Carousel.module.css'
import Image from 'next/image'

export const Carousel = ({ images }: { images: string[] }) => {
    console.log(images)
    return (
        // <section>
        <ul className={cls['horizontal-media-scroller']}>
            {images.map((image, index) => (
                <li className={cls.li} key={image + index}>
                    <figure>
                        <picture className={cls.picture}>
                            <Image
                                alt={image + index}
                                src={image}
                                width={150}
                                height={150}
                                className={cls.img}
                                priority
                            />
                        </picture>
                        {/*<figcaption>Legends</figcaption>*/}
                    </figure>
                </li>
            ))}
        </ul>
        // </section>
    )
}
