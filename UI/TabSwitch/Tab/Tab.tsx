import {FC, useContext} from "react";
import {TabSwitchContext} from "@context/context";
import cs from "classnames";
import styles from "../TabSwitch.module.scss";

interface Tab {
    index: number,
    className?: any,
    label: string
}

export const Tab: FC<Tab> = (
    {
        index,
        className,
        label
    }
) => {

    const {currentIndex, setCurrentIndex} = useContext(TabSwitchContext);

    const handleClick = () => setCurrentIndex(index);

    return (
        <button
            onClick={handleClick}
            className={cs({
                [styles.Tab]: true,
                [styles.Tab__active]: currentIndex === index,
                [className]: className
            })}
        >
            {label}
        </button>
    )
}