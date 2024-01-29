import {FC, ReactNode} from "react";
import styles from "./FiltersList.module.scss";
import cs from "classnames";

interface FiltersList {
    children: ReactNode,
    removeAllFiltersHandler: () => void,
    className?: any
}

export const FiltersList: FC<FiltersList> = (
    {
        children,
        removeAllFiltersHandler,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.FiltersList]: true,
            [className]: className
        })}>
            <p className={styles.FiltersList__label}>Выбранные фильтра:</p>
            <div className={styles.FiltersList__list}>
                {children}
            </div>
            <button onClick={removeAllFiltersHandler} className={styles.FiltersList__remove}>
                <img
                    src={"/images/delete-icon.svg"}
                    alt={"delete-icon"}
                    width={24}
                    height={24}
                    loading={"lazy"}
                />
                Очистить все
            </button>
        </div>
    )
}