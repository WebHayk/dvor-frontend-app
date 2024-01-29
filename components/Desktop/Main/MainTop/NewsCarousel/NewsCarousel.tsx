import {FC, memo, useEffect, useState} from "react";
import styles from "./NewsCarousel.module.scss";
import NewsItem from "@ui/NewsItem";
import {useDesktopSelector, useMainSelector} from "@store/selectors";
import {NewsType} from "@typescript/interfaces";
import {useRouter} from "next/router";
import useActions from "@hooks/useActions";
import {Carousel} from "@ui/Carousel/Carousel";
import CarouselItem from "@ui/Carousel/CarouselItem";
import {getRandomFloat} from "@common/utils/helpers";

export const NewsCarousel: FC = memo(() => {

    let state = useDesktopSelector();
    let mainState = useMainSelector();

    let router = useRouter();
    let {setNewsIdAction} = useActions();

    let [activeIndex, setActiveIndex] = useState<number>(0);
    let data: any = [];
    let size = 3;

    if (data.length === 0) {
        for (let i = 0; i < Math.ceil(state.news.length / size); i++) {
            data[i] = state.news.slice((i * size), (i * size) + size);
        }
    }

    useEffect(() => {
        setActiveIndex(0);
    }, [mainState.user?.apartment_user]);

    return (
            <Carousel
                className={styles.NewsCarousel}
                wrapperClassname={styles.NewsCarousel__wrapper}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                {
                    data.length
                        ?
                        data.map((response: any, index: number) => {
                            return (
                                <CarouselItem
                                    className={styles.NewsCarousel__item}
                                    key={getRandomFloat(0, 15, 3)}
                                >
                                    {
                                        data[index].map((news: NewsType) => {

                                            const handleNewsClick = async (id: number) => {
                                                await router.push("/news");
                                                setNewsIdAction(id);
                                            }

                                            return (
                                                <NewsItem
                                                    handleClick={handleNewsClick}
                                                    description={news.description}
                                                    creationDate={news.created_at}
                                                    title={news.title}
                                                    id={news.id}
                                                    key={news.id}
                                                />
                                            )
                                        })
                                    }
                                </CarouselItem>
                            )
                        })
                        :
                        null
                }
            </Carousel>
    )
});

NewsCarousel.displayName = "NewsCarousel";
