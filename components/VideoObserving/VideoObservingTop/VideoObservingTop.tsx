import React, {FC, useEffect} from "react";
import styles from "./VideoObservingTop.module.scss";
import Select from "@ui/Select";
import {useMainSelector, useVideoObservingSelector} from "@store/selectors";
import {useQuery} from "@apollo/client";
import {GET_CAMERAS, GET_CAMERAS_CATEGORY} from "@api/query/query";
import useActions from "@hooks/useActions";

let PAGE_SIZE = 4;

export const VideoObservingTop: FC = () => {
    let mainState = useMainSelector();
    let cameraState = useVideoObservingSelector();
    const cameraList = useQuery(GET_CAMERAS);
    const cameraCategories = useQuery(GET_CAMERAS_CATEGORY);
    let {
        setCameraListAction,
        setCameraPageAction,
        setCameraCategoryAction,
        setCameraCategoriesAction
    } = useActions();

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => { // Изменение категории
        setCameraCategoryAction(event.target.value);
        setCameraPageAction(0);
    };

    useEffect(() => {
        setCameraCategoryAction("Все камеры");
        setCameraPageAction(0);
    }, [mainState.user?.apartment_user]);

    useEffect(() => {
        cameraList.refetch({
            name: cameraState.category !== "Все камеры" ? cameraState.category : null,
            offset: PAGE_SIZE * cameraState.page
        })
            .then(response => {

                let data = response.data.cameras;

                if (cameraState.page == 0) {
                    setCameraListAction(data);
                } else {
                    setCameraListAction(data, cameraState.videoList);
                }

            })
            .catch(err => console.log(err))
    }, [mainState.user?.apartment_user, cameraState.category, cameraState.page]);

    useEffect(() => {
        cameraCategories.refetch()
            .then(response => {
                let categoriesResponse = response.data.camera_categories;
                setCameraCategoriesAction(categoriesResponse);
            })
            .catch(err => console.log(err))
    }, [mainState.user?.apartment_user]);

    return (
        <>
            <div className={styles.VideoObservingTop}>
                <div className={styles.VideoObservingTop__content}>
                    <div className={styles.VideoObservingTop__left}>
                        <p className={styles.VideoObservingTop__title}>Видеонаблюдение</p>
                    </div>
                    <div className={styles.VideoObservingTop__right}>
                        <div className={styles.VideoObservingTop__category}>
                            <Select
                                optionName={"name"}
                                optionKey={"key"}
                                options={cameraState.categories}
                                value={cameraState.category}
                                onChange={handleCategoryChange}
                                label={"Категория"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}