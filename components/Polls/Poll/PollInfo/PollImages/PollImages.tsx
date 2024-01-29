import {FC, memo} from "react";
import styles from "./PollImages.module.scss";
import Paper from "@ui/Paper";
import PollImagesList from "./PollImagesList";

export const PollImages: FC = memo(() => {
    return (
        <Paper className={styles.PollImages}>
            <p className={styles.PollImages__title}>Фото</p>
            <div className={styles.PollImages__list}>
                <PollImagesList />
            </div>
        </Paper>
    )
});

PollImages.displayName = "PollImages";