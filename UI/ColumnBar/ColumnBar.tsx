import {FC} from "react";
import styles from "./ColumnBar.module.scss";
import TitlesColumn from "@ui/ColumnBar/TitlesColumn";
import ValuesColumn from "@ui/ColumnBar/ValuesColumn";

interface ColumnBar {
    titles: string[],
    values: string[]
}

export const ColumnBar: FC<ColumnBar> = (
    {
        titles,
        values
    }
) => {
    return (
        <div className={styles.ColumnBar}>
            <div className={styles.ColumnBar__column}>
                <TitlesColumn
                    titles={titles}
                />
            </div>
            <div className={styles.ColumnBar__column}>
                <ValuesColumn
                    values={values}
                />
            </div>
        </div>
    )
}