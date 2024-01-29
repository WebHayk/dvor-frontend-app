import {FC} from "react";
import styles from "../ContextMenu.module.scss";

interface ContextMenuItem {
    onClick: () => void
}

export const ContextMenuItem: FC<ContextMenuItem> = ({onClick, children}) => {
    return (
        <div className={styles.ContextMenuItem} onClick={onClick}>
            {children}
        </div>
    )
}