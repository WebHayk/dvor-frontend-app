import {FC, memo} from "react";
import Paper from "@ui/Paper";
import styles from "./OwnerInfo.module.scss";
import {useTasksSelector} from "@store/selectors";

export const OwnerInfo: FC = memo(() => {

    let state = useTasksSelector();
    let owner = state.task.data?.owner;

    return (
        <div className={styles.OwnerInfo}>
            <Paper>
                <p className={styles.OwnerInfo__title}>Кем добавлена</p>
                <div className={styles.OwnerInfo__list}>
                    <div className={styles.OwnerInfo__column}>
                        <p className={styles.OwnerInfo__label}>Имя фамилия</p>
                        <p className={styles.OwnerInfo__label}>Телефон</p>
                    </div>
                    <div className={styles.OwnerInfo__column}>
                        <p className={styles.OwnerInfo__value}>{owner.profile.name} {owner.profile.last_name}</p>
                        <p className={styles.OwnerInfo__value}>+{owner.phone_number}</p>
                    </div>
                </div>
            </Paper>
        </div>
    )
});

OwnerInfo.displayName = "OwnerInfo";