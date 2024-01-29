import React, {FC, useEffect, useState} from "react";
import styles from "./Rating.module.scss";
import RatingIcon from "@ui/Rating/RatingIcon";
import {generateId, initRatingHandler} from "@common/utils/helpers";
import {StarType} from "@typescript/interfaces";
import cs from "classnames";

interface Rating {
    rating: number,
    setRating?: React.Dispatch<number>,
    className?: any,
    size?: "large" | "medium"
}

export const Rating: FC<Rating> = (
    {
        rating,
        setRating,
        className,
        size
    }
) => {

    let starSize = size == "large" ? 34 : size == "medium" ? 25 : 17;

    let [stars, setStars] = useState<StarType[]>([]);

    useEffect(() => {
        initRatingHandler(rating, setStars);
    }, [rating]);

    const handleRatingChange = (index: number) => {
       if (setRating) {
           setRating(index);
       }
    };

    return (
        <div className={cs({
            [styles.Rating]: true,
            [className]: className
        })}>
            <div className={styles.Rating__body}>
                {
                    stars.length
                    ?
                    stars.map((star, index) => {

                        index++;
                        const handleChange = () => handleRatingChange(index);

                        return (
                            <button
                                onClick={handleChange}
                                key={generateId(40)}
                                className={cs({
                                    [styles.Rating__star]: true,
                                    [styles.Rating__clickable]: setRating
                                })}
                            >
                                <RatingIcon
                                    width={starSize}
                                    height={starSize}
                                    id={generateId(40)}
                                    activeColor={star.activeColor}
                                    offset={star.offset}
                                />
                            </button>
                        );
                    })
                    :
                    null
                }
            </div>
        </div>
    )
}