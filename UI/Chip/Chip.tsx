import {FC} from "react";
import styles from "./Chip.module.scss";
import cs from "classnames";

interface Chip {
    label: string,
    onClick?: () => void,
    onDelete?: () => void,
    active: boolean,
    className?: any
}

export const Chip: FC<Chip> = ({
        label,
        onClick,
        onDelete,
        active,
        className
    }) => {
    return (
        <div
            onClick={onClick}
            className={cs({
                [styles.Chip]: true,
                [styles.Chip__active]: active,
                [className]: className
            })}
        >
            <div className={styles.Chip__content}>
                <p className={styles.Chip__label}>{label}</p>
                {
                    onDelete
                    ?
                    <div onClick={onDelete} className={styles.Chip__delete}>
                        <img
                            loading={"lazy"}
                            src={"/images/close-white-icon.svg"}
                            alt={"close-icon"}
                            width={16}
                            height={16}
                        />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}