import {FC, memo} from "react";
import styles from "./NewsItem.module.scss";
import {dateFormatterHelper, dateToTextStringHelper, dateToTimeHelper} from "@common/utils/helpers";
import cs from "classnames";

interface NewsItem {
    creationDate: string,
    title: string,
    id: number,
    description: string,
    classes?: any,
    handleClick: (id: number) => void
}

export const NewsItem: FC<NewsItem> = memo((
    {
        creationDate,
        title,
        id,
        classes,
        description,
        handleClick
    }
) => {

    let date = dateToTextStringHelper(creationDate);
    let time = dateToTimeHelper(creationDate);

    const handleRedirect = () => handleClick(id);

    return (
        <div
            onClick={handleRedirect}
            className={cs({
                [styles.NewsItem]: true,
                [classes?.join(" ")]: classes?.length
            })}
        >
            <p className={styles.NewsItem__title}>{title}</p>
            <p className={styles.NewsItem__description}>{description}</p>
            <p className={styles.NewsItem__date}>{date}, {time}</p>
        </div>
    )
});

NewsItem.displayName = "NewsItem";