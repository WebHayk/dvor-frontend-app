import React, {FC, useState} from "react";
import styles from "../TaskTop.module.scss";
import Dialog from "@ui/Dialog";
import {ErrorMessage, Formik} from "formik";
import Rating from "@ui/Rating";
import Textarea from "@ui/Textarea";
import DialogFooter from "@ui/Dialog/DialogFooter";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {CREATE_REVIEW_FORM_SCHEMA} from "@common/schemas/schemas";
import cs from "classnames";
import {useTasksSelector} from "@store/selectors";
import FilesUpload from "@ui/FilesUpload";
import {FileType} from "@typescript/interfaces";
import Switch from "@ui/Switch";
import {FilesService} from "@services/filesService";
import {requestsService} from "@services/requestsService";

interface TaskEstimateDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const TaskEstimateDialog: FC<TaskEstimateDialog> = (
    {
        open,
        setOpen
    }
) => {

    let state = useTasksSelector();
    let task = state.task;

    let [rating, setRating] = useState<number>(0);
    let [isError, setIsError] = useState<boolean>(false);

    let [isHidedUserInfo, setHidedUserInfo] = useState<boolean>(false);
    let [isHidedImages, setHidedImages] = useState<boolean>(false);

    let [reviewImages, setReviewImages] = useState<FileType[]>([]);

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Оценка выполнения"}
        >
            <Formik
                initialValues={{
                    rating: 0,
                    review: "",
                    id: 0,
                    is_hided_user_info: false,
                    is_hided_images: false,
                    review_images: [] as string[]
                }}
                onSubmit={values => {

                    values.rating = rating;
                    values.id = task.data.id;
                    values.is_hided_images = isHidedImages;
                    values.is_hided_user_info = isHidedUserInfo;

                    if (rating != 0) {
                        setIsError(false);

                        if (reviewImages.length) {
                            let files = FilesService.getFiles(reviewImages);

                            FilesService.filesUploadRequest(files)
                                .then(response => {
                                    values.review_images = FilesService.imagesArrayCreator(response);
                                    requestsService.taskEstimate(values, setOpen);
                                })
                                .catch(err => console.log(err))
                        } else {
                            requestsService.taskEstimate(values, setOpen);
                        }

                    } else {
                        setIsError(true);
                    }
                }}
                validationSchema={CREATE_REVIEW_FORM_SCHEMA}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => (
                    <div className={styles.TaskEstimateDialog}>
                        <div className={styles.TaskEstimateDialog__content}>
                            <div className={styles.TaskEstimateDialog__rating}>
                                <Rating
                                    size={"large"}
                                    rating={rating}
                                    setRating={setRating}
                                />
                                <p className={cs({
                                    [styles.TaskEstimateDialog__label]: true,
                                    [styles.TaskEstimateDialog__error]: isError
                                })}>Поставьте оценку</p>
                            </div>
                            <Textarea
                                className={styles.TaskEstimateDialog__area}
                                placeholder={"Насколько вы довольны решением данной задачи?"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.review}
                                name={"review"}
                            />
                            <ErrorMessage
                                name={"review"}
                                render={msg => <ErrorMessageComponent label={msg}/>}
                            />
                        </div>
                        <div className={styles.TaskEstimateDialog__file}>
                            <FilesUpload
                                maxLength={3}
                                title={"Фото"}
                                files={reviewImages}
                                setFiles={setReviewImages}
                            />
                        </div>
                        <div className={styles.TaskEstimateDialog__bottom}>
                            <label className={styles.TaskEstimateDialog__option}>
                                <Switch
                                    checked={isHidedUserInfo}
                                    setChecked={setHidedUserInfo}
                                    name={"isHidedUserInfo"}
                                />
                                <span>Скрыть пользовательскую информацию</span>
                            </label>
                            <label className={styles.TaskEstimateDialog__option}>
                                <Switch
                                    checked={isHidedImages}
                                    setChecked={setHidedImages}
                                    name={"isHidedImages"}
                                />
                                <span>Прикрепить файлы с задачи</span>
                            </label>
                        </div>
                        <DialogFooter
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            submitAction={"Подтвердить"}
                        />
                    </div>
                )}
            </Formik>
        </Dialog>
    )
}