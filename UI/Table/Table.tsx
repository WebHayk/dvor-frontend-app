import {FC} from "react";
import styles from "./Table.module.scss";

interface Table {
    classes?: string[]
}

export const Table: FC<Table> = ({children, classes}) => {
    return (
        <table className={`${styles.Table} ${classes !== undefined ? classes.join(" ") : ""}`}>
            {children}
        </table>
    )
}