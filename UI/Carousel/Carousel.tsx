import React, {Dispatch, FC, memo} from "react";
import styles from "./Carousel.module.scss";
import cs from "classnames";

interface Carousel {
    activeIndex: number,
    setActiveIndex: Dispatch<number>,
    className?: string,
    wrapperClassname?: string
}

export const Carousel: FC<Carousel> = memo((
    {
        children,
        activeIndex,
        setActiveIndex,
        className,
        wrapperClassname
    }) => {

    let childrenLength = React.Children.count(children);

    const updateIndex = (newIndex: number) => {
        setActiveIndex(newIndex);
    };

    return (
        <div
            className={cs({
                [styles.Carousel]: true,
                [className as string]: className
            })}
        >
            {
                activeIndex
                ?
                <button
                    className={styles.Carousel__prev}
                    onClick={() => updateIndex(activeIndex - 1)}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/arrow-grey-icon.svg"}
                        alt={"arrow-icon"}
                        width={24}
                        height={24}
                    />
                </button>
                :
                null
            }
            <div
                className={cs({
                    [styles.Carousel__inner]: true,
                    [wrapperClassname as string]: wrapperClassname
                })}
                style={{ transform: `translateX(-${activeIndex * 100}%)`}}
            >
                {children}
            </div>
            {
                childrenLength != activeIndex + 1
                ?
                <button
                    className={styles.Carousel__next}
                    onClick={() => updateIndex(activeIndex + 1)}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/arrow-grey-icon.svg"}
                        alt={"arrow-icon"}
                        width={24}
                        height={24}
                    />
                </button>
                :
                null
            }

        </div>
    )
});

Carousel.displayName = "Carousel";