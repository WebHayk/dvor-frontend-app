import {FC, useEffect, useState} from "react";
import styles from "../VideoObserving.module.scss";
import VideoItem from "./VideoItem";
import {useVideoObservingSelector} from "@store/selectors";
import {VideoType} from "@typescript/interfaces";
import Button from "@ui/Button";
import useActions from "@hooks/useActions";

let PAGE_SIZE = 4;

export const VideoList: FC = () => {

    let [page, setPage] = useState<number>(0);
    const videoObservingState = useVideoObservingSelector();
    const {setCameraPageAction} = useActions();

    const handleLoadMore = () => setPage(prevState => prevState + 1);

    useEffect(() => {
        setCameraPageAction(page);
    }, [page]);

    useEffect(() => {
        setPage(0);
    },[videoObservingState.category]);

    return (
        <>
            <div className={styles.VideoList}>
                {
                    videoObservingState.videoList.length
                        ?
                        videoObservingState.videoList.map((video: VideoType, index: number) => {

                            let count = index + 1;

                            return (
                                <VideoItem
                                    key={video.id}
                                    pathToStream={video.path_to_stream}
                                    name={`Камера ${count} (${video.category.name})`}
                                />
                            )
                        })
                        :
                        <p>Пока нету камер</p>
                }
            </div>
            {
                videoObservingState.videoList.length == PAGE_SIZE
                ?
                <div className={styles.VideoList__more}>
                    <Button
                        type={"button"}
                        onClick={handleLoadMore}
                        color={"white"}
                        label={"Загрузить еще"}
                    />
                </div>
                :
                null
            }
        </>
    )
}