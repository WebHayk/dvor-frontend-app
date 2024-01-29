import {FC, memo, useEffect, useState} from "react";
import styles from "./NewsList.module.scss";
import {useQuery} from "@apollo/client";
import {GET_NEWS} from "@api/query/query";
import {NewsType} from "@typescript/interfaces";
import NewsItem from "@ui/NewsItem";
import useActions from "@hooks/useActions";
import {useMainSelector, useNewsSelector} from "@store/selectors";
import Button from "@ui/Button";

let PAGE_SIZE = 5;

export const NewsList: FC = memo(() => {

    let [page, setPage] = useState(0);

    let {
        setNewsListAction,
        setMoreNewsAction,
        setNewsIdAction
    } = useActions();

    let newsState = useNewsSelector();
    let mainState = useMainSelector();

    let newsList = useQuery(GET_NEWS, {
        variables: {
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * page
        }
    });

    useEffect(() => {
        setPage(0);
    }, [mainState.user?.apartment_user])

    useEffect(() => {
        newsList.refetch()
            .then(response => {
                if (page == 0) {
                    setNewsListAction(response.data.news);
                } else {
                    setMoreNewsAction(response.data.news);
                }
            })
            .catch(err => console.log(err))
    }, [page, mainState.user?.apartment_user]);

    const handleMoreLoad = () => setPage(prevState => prevState + 1);

    return (
        newsState.news.length
            ?
            <div className={styles.NewsList}>
                {
                    newsState.news.map((news: NewsType) => {

                        const handleNewsClick = (id: number) => setNewsIdAction(id);

                        return (
                            <NewsItem
                                classes={[styles.NewsList__item]}
                                handleClick={handleNewsClick}
                                key={news.id}
                                creationDate={news.created_at}
                                title={news.title}
                                id={news.id}
                                description={news.description}
                            />
                        )
                    })
                }
                {
                    newsState.news.length >= 5 && newsList.data?.news.length
                        ?
                        <div className={styles.NewsList__more}>
                            <Button
                                type={"button"}
                                onClick={handleMoreLoad}
                                color={"white"}
                                label={"Загрузить еще"}
                            />
                        </div>
                        :
                        null
                }
            </div>
            :
            !newsList.loading && !newsState.news.length
                ?
                <p className={styles.NewsList__empty}>Пока нет новостей</p>
                :
                null
    )
});

NewsList.displayName = "NewsList";