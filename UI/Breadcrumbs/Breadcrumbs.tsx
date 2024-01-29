import {FC} from "react";
import styles from "./Breadcrumbs.module.scss";

export const Breadcrumbs: FC = ({children}) => {
    return (
        <div className={styles.Breadcrumbs}>
            {children}
        </div>
    )
}