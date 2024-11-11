import cls from './RatingBlock.module.css'
import { StarRating } from '@/shared/ui/StarRating'

export const RatingBlock = ({
    rating,
}: {
    rating: number | null | undefined
}) => {
    if (!rating) {
        return <div className={cls.noRating}>No rating</div>
    }

    return (
        <div className={cls.stars}>
            <StarRating rating={rating} />
            {rating}
        </div>
    )
}
