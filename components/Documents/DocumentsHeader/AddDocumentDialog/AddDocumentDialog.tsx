import React, {FC, useEffect, useState} from "react";
import Dialog from "@ui/Dialog";
import styles from "../DocumentsHeader.module.scss";
import FileUpload from "@ui/FileUpload";
import {FILES_ACCEPT} from "@common/utils/options";
import DialogFooter from "@ui/Dialog/DialogFooter";
import {FilesService} from "@services/filesService";
import {FileUploadType} from "@typescript/interfaces";
import {ErrorMessage, Formik} from "formik";
import {useDocumentsSelector, useMainSelector} from "@store/selectors";
import Select from "@ui/Select";
import {ADD_DOCUMENT_FORM_SCHEMA} from "@common/schemas/schemas";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {DocumentsService} from "@services/documentsService";
import useActions from "@hooks/useActions";
import TextField from "@ui/TextField";

interface AddDocumentDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const AddDocumentDialog: FC<AddDocumentDialog> = (
    {
        open,
        setOpen
    }
) => {

    let state = useDocumentsSelector();
    let mainState = useMainSelector();

    let {
        targetGroups,
        types
    } = state;

    let {setDocumentsUpdateStateAction} = useActions();

    let [file, setFile] = useState<File | null>(null);
    let [error, setError] = useState<string>("");

    const handleClose = () => setOpen(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            let response = await FilesService.handleFileUpload(event);
            let {file, image} = response as FileUploadType;
            setFile(file);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Загрузить документ"}
        >
            <div className={styles.AddDocumentDialog}>
                <div className={styles.AddDocumentDialog__content}>
                    <div className={styles.AddDocumentDialog__file}>
                        <FileUpload
                            accept={FILES_ACCEPT}
                            handleChange={handleFileChange}
                        >
                            <div className={styles.AddDocumentDialog__upload}>Загрузить</div>
                        </FileUpload>
                        <div className={styles.AddDocumentDialog__result}>{file ? file.name : null}</div>
                    </div>
                    <Formik
                        initialValues={{
                            document_name: "",
                            target_group_key: "",
                            type_key: ""
                        }}
                        onSubmit={values => {

                            let {type_key} = values;

                            if (file) {

                                if (!values.document_name) {
                                    values.document_name = file.name;
                                }

                                DocumentsService.documentsUploadRequest(values, file, setOpen, setDocumentsUpdateStateAction);

                            } else {
                                setError("Заполните все поля");
                            }
                        }}
                        validationSchema={ADD_DOCUMENT_FORM_SCHEMA}
                    >
                        {({
                              values,
                              handleChange,
                              handleBlur,
                              handleSubmit
                        }) => (
                            <>
                                <TextField
                                    type={"text"}
                                    value={values.document_name}
                                    name={"document_name"}
                                    placeholder={"Название документа"}
                                    onChange={handleChange}
                                />
                                <Select
                                    className={styles.AddDocumentDialog__row}
                                    label={"Доступ"}
                                    optionKey={"key"}
                                    optionName={"name"}
                                    options={targetGroups}
                                    value={values.target_group_key}
                                    onChange={handleChange}
                                    name={"target_group_key"}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name={"target_group_key"}
                                    render={msg => <ErrorMessageComponent label={msg} />}
                                />
                                <Select
                                    label={"Тип документа"}
                                    optionKey={"key"}
                                    optionName={"name"}
                                    options={types}
                                    value={values.type_key}
                                    onChange={handleChange}
                                    name={"type_key"}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name={"type_key"}
                                    render={msg => <ErrorMessageComponent label={msg} />}
                                />
                                { error && <ErrorMessageComponent label={error} /> }
                                <DialogFooter
                                    handleClose={handleClose}
                                    handleSubmit={handleSubmit}
                                    submitAction={"Сохранить"}
                                />
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </Dialog>
    )
}