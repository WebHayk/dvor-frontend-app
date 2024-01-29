import {FC} from "react";
import styles from "../EventControl.module.scss";

interface ControlItem {
    icon: string,
    counter: string,
    onClick: () => void
}

const ControlItem: FC<ControlItem> = (
    {
        icon,
        counter,
        onClick
    }
) => {
    return (
        <div onClick={onClick} className={styles.Event__controlItem}>
            <img
                loading={"lazy"}
                src={icon}
                alt={"control-icon"}
                width={18}
                height={18}
            />
            <span>{counter}</span>
        </div>
    )
}

export default ControlItem