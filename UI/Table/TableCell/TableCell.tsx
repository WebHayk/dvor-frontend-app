import {FC} from "react";
import styles from "../Table.module.scss";

interface TableCell {
    type: "td" | "th",
    classes?: string[],
    align?: "left" | "right" | "center",
    onClick?: () => void
}

export const TableCell: FC<TableCell> = (
    {
        type,
        align,
        classes,
        children,
        onClick
    }
) => {

    return (
        type === "td"
        ?
        <td
            onClick={onClick}
            align={align || "left"}
            className={classes?.join(" ")}
        >
            {children}
        </td>
        :
        <th
            align={align || "left"}
            className={`${styles.TableHead__cell} ${classes !== undefined ? classes.join(" ") : ""}`}
        >
            {children}
        </th>
    )

}