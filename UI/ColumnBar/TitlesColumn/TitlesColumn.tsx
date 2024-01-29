import {FC} from "react";
import styles from "../ColumnBar.module.scss";

interface TitlesColumn {
    titles: string[]
}

export const TitlesColumn: FC<TitlesColumn> = (
    {
        titles
    }
) => {
    return (
        <>
            {
                titles.map((title: string, index) => {
                    return (
                        <p
                            key={index}
                            className={styles.ColumnBar__label}
                        >{title}</p>
                    )
                })
            }
        </>
    )
}