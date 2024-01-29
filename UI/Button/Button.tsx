import {FC} from "react";
import styles from "./Button.module.scss";
import cs from "classnames";

interface Button<T> {
    type: "button" | "submit" | "reset",
    onClick: () => T,
    label?: string,
    color: "white" | "blue",
    icon?: string,
    className?: string,
    disabled?: boolean
}

export const Button: FC<Button<any>> = (
    {
        type,
        label,
        onClick,
        color,
        icon,
        disabled,
        className
    }
) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={cs({
                [styles.Button]: true,
                [styles.Button__white]: color === "white",
                [styles.Button__blue]: color === "blue",
                [styles.Button__icon]: !label?.length,
                [className as string]: className
            })}
        >
            {
                icon?.length
                ?
                <img
                    loading={"lazy"}
                    src={icon}
                    height={14}
                    width={14}
                    alt={"button-icon"}
                />
                :
                null
            }
            {
                label?.length
                ?
                <span className={icon?.length ? styles.Button__label : ""}>{label}</span>
                :
                null
            }
        </button>
    )
}