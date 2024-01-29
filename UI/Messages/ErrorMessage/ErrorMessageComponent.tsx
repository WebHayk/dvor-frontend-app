import {FC} from "react";
import styles from "./ErrorMessage.module.scss";
import cs from "classnames";

interface ErrorMessage {
    label: string,
    className?: any
}

export const ErrorMessageComponent: FC<ErrorMessage> = (
    {
        label,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.ErrorMessage]: true,
            [className]: className
        })}>
            {label}
        </div>
    )
}