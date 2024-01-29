import {FC, memo} from "react";
import styles from "./PollsItem.module.scss";
import {useRouter} from "next/router";
import PollsDate from "@ui/Polls/PollsDate";

interface PollsItem {
    theme: string,
    content: string,
    startDate: string,
    endDate: string,
    id: number
}

export const PollsItem: FC<PollsItem> = memo((
    {
        theme,
        content,
        startDate,
        endDate,
        id
    }
) => {

    let router = useRouter();

    const handleClick = () => router.push(`/polls/${id}`);

    return (
        <div onClick={handleClick} className={styles.PollsItem}>
            <div className={styles.PollsItem__header}>
                <p className={styles.PollsItem__theme}>{theme}</p>
            </div>
            <p className={styles.PollsItem__content}>{content}</p>
            <div className={styles.PollsItem__footer}>
                <PollsDate
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    )
});

PollsItem.displayName = "PollsItem";