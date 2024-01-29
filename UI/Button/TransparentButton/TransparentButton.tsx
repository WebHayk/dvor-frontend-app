import {FC} from "react";
import styles from "./TransparentButton.module.scss";

interface TransparentButton {
    onClick: any,
    label: string,
    icon: string
}

export const TransparentButton: FC<TransparentButton> = (
    {
        onClick,
        label,
        icon
    }
) => {
    return (
        <button
            onClick={onClick}
            className={styles.TransparentButton}
        >
            <img
                loading={"lazy"}
                src={icon}
                alt={"button-icon"}
                width={14}
                height={14}
            />
            <span className={styles.TransparentButton__action}>{label}</span>
        </button>
    )
}