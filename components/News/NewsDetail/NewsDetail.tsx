import {FC, useEffect} from "react";
import styles from "./NewsDetail.module.scss";
import {useNewsSelector} from "@store/selectors";
import {useQuery} from "@apollo/client";
import {GET_NEWS_ONE} from "@api/query/query";
import useActions from "@hooks/useActions";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {dateFormatterHelper} from "@common/utils/helpers";

export const NewsDetail: FC = () => {

    let state = useNewsSelector();
    let {setNewsDetailAction} = useActions();
    let newsDetail = useQuery(GET_NEWS_ONE, {
        variables: {
            id: state.newsId
        }
    });

    useEffect(() => {
        if (state.newsId) {
          newsDetail.refetch()
              .then(response => {
                  setNewsDetailAction(response.data.news_by_pk);
              })
              .catch(err => console.log(err))
        }
    }, [state.newsId])

    return (
        state.newsDetail
        ?
        <div className={styles.NewsDetail}>
            {
                state.newsDetail.image_path
                ?
                <div className={styles.NewsDetail__preview}>
                    <img
                        src={ASSETS_BASE_URL + state.newsDetail.image_path}
                        alt={"news-image"}
                    />
                </div>
                :
                null
            }
            <div className={styles.NewsDetail__content}>
                <p className={styles.NewsDetail__date}>{dateFormatterHelper(state.newsDetail.created_at)}</p>
                <p className={styles.NewsDetail__title}>{state.newsDetail.title}</p>
                <p className={styles.NewsDetail__description}>{state.newsDetail.description}</p>
            </div>
        </div>
        :
        null
    )
}