import {FC} from "react";
import styles from "../Table.module.scss";

interface TableRow {
    classes?: string[],
    type?: "hover"
    onClick?: () => void
}

export const TableRow: FC<TableRow> = (
    {
        classes,
        onClick,
        children,
        type
    }
) => {
    return (
        <tr
            onClick={onClick}
            className={`${styles.TableBody__row} ${type === "hover" ? styles.TableBody__hover : ""} ${classes !== undefined ? classes.join(" ") : ""}`}>
            {children}
        </tr>
    )
}