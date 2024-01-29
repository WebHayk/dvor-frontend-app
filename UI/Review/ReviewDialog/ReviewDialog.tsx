import React, {FC, useEffect, useState} from "react";
import styles from "./ReviewDialog.module.scss";
import Dialog from "@ui/Dialog";
import {ErrorMessage, Formik} from "formik";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import Rating from "@ui/Rating";
import DialogFooter from "@ui/Dialog/DialogFooter";
import {CREATE_REVIEW_FORM_SCHEMA} from "@common/schemas/schemas";
import Textarea from "@ui/Textarea";
import {FileType, ReviewFormType} from "@typescript/interfaces";
import FilesUpload from "@ui/FilesUpload";
import {FilesService} from "@services/filesService";

interface ReviewDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    onSubmit: (values: ReviewFormType) => void,
    title: string,
    review?: string,
    ratingInitial?: number,
    images?: string[]
}

export const ReviewDialog: FC<ReviewDialog> = (
    {
        open,
        setOpen,
        onSubmit,
        title,
        review,
        images,
        ratingInitial
    }
) => {

    const handleClose = () => {
        setOpen(false);
        setRating(0);
    };

    let imagesList = images ? FilesService.toImageObjectsHelper(images) : [];

    let [files, setFiles] = useState<FileType[]>([]);
    let [rating, setRating] = useState<number>(0);
    let [error, setError] = useState<string>("");

    useEffect(() => {
        if (ratingInitial) {
            setRating(ratingInitial);
        }
    }, [open]);

    useEffect(() => {
        if (images && images.length) {
            let data: any = FilesService.toFileObjectsHelper(images);
            setFiles(data);
        }
    }, [images]);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={title}
        >
            <Formik
                initialValues={{
                    review: review || "",
                    rating,
                    images: [] as string[]
                }}
                onSubmit={(values, {resetForm}) => {
                    if (rating == 0) {
                        setError("Значение рейтинга должно быть положительным");
                    } else {
                        values.rating = rating;

                        if (files.length) {

                            let currentFiles: string[] = [];
                            let uploads: File[] = [];

                            FilesService.filterFiles(files, uploads, currentFiles);

                            if (uploads.length) {
                                FilesService.filesUploadRequest(uploads)
                                    .then(response => {
                                        values.images = FilesService.imagesArrayCreator(response).concat(currentFiles);
                                        onSubmit(values);
                                    })
                                    .catch(error => console.log(error))
                            } else {
                                values.images = currentFiles;
                                onSubmit(values);
                            }
                        } else {
                            onSubmit(values);
                        }

                        setRating(0);
                        resetForm();
                        setError("");
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
                    <>
                        <div className={styles.CreateReviewDialog__row}>
                            <p className={styles.CreateReviewDialog__label}>Рейтинг</p>
                            <div className={styles.CreateReviewDialog__rating}>
                                <Rating
                                    rating={rating}
                                    setRating={setRating}
                                />
                                <span className={styles.CreateReviewDialog__ratingLabel}>{rating}</span>
                            </div>
                            {
                                error.length
                                ?
                                <ErrorMessageComponent label={error}/>
                                :
                                null
                            }
                        </div>
                        <div className={styles.CreateReviewDialog__row}>
                            <Textarea
                                className={styles.CreateReviewDialog__review}
                                name={"review"}
                                placeholder={"Отзыв"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.review}
                            />
                            <ErrorMessage
                                name={"review"}
                                render={msg => <ErrorMessageComponent label={msg}/>}
                            />
                        </div>
                        <FilesUpload
                            imagesList={imagesList}
                            title={"Фото"}
                            files={files}
                            setFiles={setFiles}
                        />
                        <DialogFooter
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            submitAction={"Сохранить"}
                        />
                    </>
                )}
            </Formik>
        </Dialog>
    )
}