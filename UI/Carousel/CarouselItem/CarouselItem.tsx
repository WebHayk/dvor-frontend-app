import {FC, ReactNode} from "react";
import styles from "../Carousel.module.scss";
import cs from "classnames";

interface CarouselItem {
    children: ReactNode,
    className?: string
}

export const CarouselItem: FC<CarouselItem> = (
    {
        children,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.CarouselItem]: true,
            [className as string]: className
        })}>
            {children}
        </div>
    )
}