import cls from './RatingBlock.module.css'
import { StarRating } from '@/shared/ui/StarRating'

export const RatingBlock = ({ rating }: { rating: number | undefined }) => (
    <div className={cls.stars}>
        <StarRating rating={rating} />
        {rating}
    </div>
)
