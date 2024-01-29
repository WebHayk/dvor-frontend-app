import React, {FC, memo, useEffect, useState} from "react";
import styles from "./TaskInteractionDialog.module.scss";
import Dialog from "@ui/Dialog";
import {Formik, FormikValues} from "formik";
import TextField from "@ui/TextField";
import {useQuery} from "@apollo/client";
import {GET_TASK_TYPES} from "@api/query/query";
import {TASK_INTERACTION_FORM_SCHEMA} from "@common/schemas/schemas";
import {ErrorMessage} from "formik";
import {addHiddenStyle, removeHiddenStyle} from "@common/utils/views";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import Select from "@ui/Select";
import {TASK_CRITICALITY_LIST} from "@common/utils/options";
import DialogFooter from "@ui/Dialog/DialogFooter";
import FilesUpload from "@ui/FilesUpload";
import {FileType, TaskType} from "@typescript/interfaces";
import Textarea from "@ui/Textarea";
import {FilesService} from "@services/filesService";

interface TaskInteractionDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    title: string,
    setValues: React.Dispatch<FormikValues>,
    initialValues?: TaskType,
    submitAction: string
}

export const TaskInteractionDialog: FC<TaskInteractionDialog> = memo((
    {
        open,
        setOpen,
        title,
        setValues,
        initialValues,
        submitAction
    }
) => {

    let owner_images = initialValues?.owner_images;

    let [types, setTypes] = useState<KeyType[]>([]);

    let [images, setImages] = useState<FileType[]>([]);
    let imagesList = owner_images ? FilesService.toImageObjectsHelper(owner_images) : [];

    useEffect(() => {
        if (owner_images) {
            let files = FilesService.toFileObjectsHelper(owner_images);
            setImages(files as any);
        } else {
            setImages([]);
        }
    }, [owner_images]);

    const typesQuery = useQuery(GET_TASK_TYPES);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (typesQuery.data) setTypes(typesQuery.data.task_types);
    }, [typesQuery]);

    useEffect(() => {
        if (open) {
            addHiddenStyle();
        } else {
            removeHiddenStyle();
        }
    }, [open]);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={title}
        >
            <Formik
                initialValues={{
                    theme: initialValues?.theme || "",
                    description: initialValues?.description || "",
                    type_key: initialValues?.task_type?.key || "",
                    urgently: initialValues?.urgently ? "Высокая" : "Низкая",
                    owner_images: [] as FileType[]
                }}
                onSubmit={(values) => {
                    values.owner_images = images;
                    setValues(values);
                }}
                validationSchema={TASK_INTERACTION_FORM_SCHEMA}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => (
                    <div className={styles.TaskInteractionDialog}>
                        <TextField
                            type={"text"}
                            value={values.theme}
                            name={"theme"}
                            onChange={handleChange}
                            placeholder={"Тема задачи"}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage
                            name="theme"
                            render={msg => <ErrorMessageComponent label={msg}/>}
                        />
                        <div className={styles.TaskInteractionDialog__description}>
                            <p className={styles.TaskInteractionDialog__label}>Описание задачи</p>
                            <Textarea
                                value={values.description}
                                name={"description"}
                                onChange={handleChange}
                                placeholder={"Описание задачи"}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            name="description"
                            render={msg => <ErrorMessageComponent label={msg}/>}
                        />
                        <div className={styles.TaskInteractionDialog__row}>
                            <div className={styles.TaskInteractionDialog__field}>
                                <Select
                                    optionName={"name"}
                                    optionKey={"key"}
                                    options={types}
                                    value={values.type_key}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label={"Тип заявки"}
                                    name={"type_key"}
                                />
                            </div>
                            <div className={styles.TaskInteractionDialog__field}>
                                <Select
                                    name={"urgently"}
                                    label={"Критичность"}
                                    options={TASK_CRITICALITY_LIST}
                                    value={values.urgently}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <ErrorMessage
                            name="type_key"
                            render={msg => <ErrorMessageComponent label={msg}/>}
                        />
                        <div className={"mt-20"}>
                            <FilesUpload
                                imagesList={imagesList}
                                title={"Фото"}
                                files={images}
                                setFiles={setImages}
                            />
                        </div>
                        <DialogFooter
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            submitAction={submitAction}
                        />
                    </div>
                )}
            </Formik>
        </Dialog>
    )
});

TaskInteractionDialog.displayName = "TaskInteractionDialog";