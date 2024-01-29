import React, {FC} from "react";
import styles from "../FilterControl.module.scss";
import Checkbox from "@ui/Checkbox";

interface ControlItem {
    icon: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => any,
    filters: string[]
}

export const ControlItem: FC<ControlItem> = (
    {
        icon,
        label,
        onChange,
        filters
    }
) => {

    return (
        <div className={styles.ControlItem}>
            <div className={styles.ControlItem__left}>
                <img
                    loading={"lazy"}
                    src={icon}
                    alt={"control-icon"}
                    width={27}
                    height={34}
                />
                <span className={styles.ControlItem__text}>{label}</span>
            </div>
            <div className={styles.ControlItem__right}>
                <Checkbox
                    data={label}
                    onChange={onChange}
                    name={"control"}
                    checked={filters.includes(label)}
                />
            </div>
        </div>
    )
}