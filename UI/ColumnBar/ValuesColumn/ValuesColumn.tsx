import {FC} from "react";
import styles from "../ColumnBar.module.scss";

interface ValuesColumn {
    values: string[]
}

export const ValuesColumn: FC<ValuesColumn> = (
    {
        values
    }
) => {
    return (
        <>
            {
                values.map((value: string, index) => {
                    return (
                        <p
                            key={index}
                            className={styles.ColumnBar__value}
                        >
                            {value || "Отсутствует"}
                        </p>
                    )
                })
            }
        </>
    )
}