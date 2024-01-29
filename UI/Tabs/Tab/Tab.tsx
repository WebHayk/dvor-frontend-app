import {FC, useContext} from "react";
import styles from "../TabList.module.scss";
import {TabContext} from "@context/context";
import cs from "classnames";
import Badge from "@ui/Badge";

interface Tab {
    label: string,
    index: number,
    className?: any,
    count?: number
}

export const Tab: FC<Tab> = (
    {
        label,
        index,
        className,
        count
    }) => {

    const {setCurrentTab, currentTab} = useContext(TabContext);

    const handleClick = () => setCurrentTab(index);

    return (
        <button
            onClick={handleClick}
            className={cs({
                [styles.Tab]: true,
                [styles.Tab__active]: currentTab === index,
                [className]: className
            })}
        >
            {label}
            {
                count != undefined
                &&
                <Badge
                    className={styles.Tab__count}
                    color={"blue"}
                >
                    {count}
                </Badge>
            }
        </button>
    )
}