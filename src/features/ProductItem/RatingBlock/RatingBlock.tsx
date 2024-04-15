import cls from './RatingBlock.module.css'
import { getTranslation } from '@/shared/lib/hooks/getTranslation'
import { StarRating } from '@/shared/ui/StarRating'

export const RatingBlock = ({ rating }: { rating: number | undefined }) => {
    const { t } = getTranslation()
    return (
        <div className={cls.stars}>
            <StarRating rating={rating} />
            {rating}
        </div>
    )
}
