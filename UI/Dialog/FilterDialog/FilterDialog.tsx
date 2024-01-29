import React, {FC, ReactNode} from "react";
import Button from "@ui/Button";
import styles from "./FilterDialog.module.scss";
import cs from "classnames";

interface FilterDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
    handleSubmit: () => void,
    title: string,
    children: ReactNode,
    className: string
}

export const FilterDialog: FC<FilterDialog> = (
    {
        title,
        children,
        handleSubmit,
        open,
        setOpen,
        className
    }
) => {

    const handleClose = () => setOpen(false);

    return (
        open
        ?
        <div className={cs({
            [styles.FilterDialog]: true,
            [className]: className
        })}>
            <div className={styles.FilterDialog__top}>
                <p className={styles.FilterDialog__title}>{title}</p>
                <button onClick={handleClose}>
                    <img
                        src={"/images/close-black-icon.svg"}
                        alt={"close-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            {children}
            <div className={styles.FilterDialog__footer}>
                <Button
                    type={"button"}
                    onClick={handleSubmit}
                    color={"blue"}
                    label={"Применить фильтр"}
                />
            </div>
        </div>
        :
        null
    )
}