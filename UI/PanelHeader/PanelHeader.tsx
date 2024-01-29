import {FC} from "react";
import styles from "./PanelHeader.module.scss";

interface PanelHeader {
    icon: string,
    title: string
}

export const PanelHeader: FC<PanelHeader> = (
    {
        icon,
        title
    }
) => {
    return (
        <div className={styles.PanelHeader}>
            <div className={styles.PanelHeader__icon}>
                <img
                    src={icon}
                    alt={"header-icon"}
                    width={20}
                    height={20}
                />
            </div>
            <p className={styles.PanelHeader__title}>{title}</p>
        </div>
    )
}