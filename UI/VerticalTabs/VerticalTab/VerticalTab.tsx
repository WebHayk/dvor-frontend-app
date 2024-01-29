import {FC, useContext} from "react";
import styles from "../VerticalTabs.module.scss";
import {VerticalTabContext} from "@context/context";
import cs from "classnames";

interface VerticalTab {
    icon: string,
    label: string,
    index: number
}

export const VerticalTab: FC<VerticalTab> = (
    {
        icon,
        label,
        index
    }
) => {

    let {setCurrentIndex, currentIndex} = useContext(VerticalTabContext);

    const handleClick = () => setCurrentIndex(index);

    return (
        <li
            onClick={handleClick}
            className={cs({
                [styles.VerticalTab]: true,
                [styles.VerticalTab__active]: currentIndex == index
            })}
        >
            <img
                loading={"lazy"}
                className={styles.VerticalTab__icon}
                src={icon}
                alt={"tab-icon"}
                width={20}
                height={20}
            />
            <span className={cs({
                [styles.VerticalTab__label]: true,
                [styles.VerticalTab__activeLabel]: currentIndex == index
            })}>{label}</span>
        </li>
    )
}