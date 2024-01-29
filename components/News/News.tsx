import {FC, memo} from "react";
import styles from "./News.module.scss";
import NewsList from "./NewsList";
import {useNewsSelector} from "@store/selectors";
import NewsDetail from "./NewsDetail";

export const NewsComponent: FC = memo(() => {

    let state = useNewsSelector();

    return (
        <div className={styles.News}>
            <div className={styles.News__content}>
                <NewsList />
                { state.newsId ? <NewsDetail /> : null }
            </div>
        </div>
    )
});

NewsComponent.displayName = "NewsComponent";