import {FC} from "react";
import styles from "./Section.module.scss";

interface Section {
    title: string,
    description?: string,
    classes?: string[]
}

export const Section: FC<Section> = (
    {
        children,
        title,
        description,
        classes
    }
) => {
    return (
        <div className={`${styles.Section} ${classes !== undefined ? classes.join(" ") : ""}`}>
            <p className={styles.Section__title}>{title}</p>
            <p className={styles.Section__description}>{description}</p>
            {children}
        </div>
    )
}