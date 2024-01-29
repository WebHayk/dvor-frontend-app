import React, {FC} from "react";
import styles from "./RatingView.module.scss";
import Rating from "@ui/Rating";
import cs from "classnames";

interface RatingView {
    rating: number,
    title: string,
    className?: any
}

export const RatingView: FC<RatingView> = (
    {
        rating,
        title,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.RatingView]: true,
            [className]: className
        })}>
            <div className={styles.RatingView__left}>
                <p className={styles.RatingView__value}>{rating}</p>
            </div>
            <div className={styles.RatingView__right}>
                <p className={styles.RatingView__label}>{title}</p>
                <Rating
                    rating={rating}
                />
            </div>
        </div>
    )
}