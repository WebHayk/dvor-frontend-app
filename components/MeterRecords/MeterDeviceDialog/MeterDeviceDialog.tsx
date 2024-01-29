import React, {FC, memo, useEffect, useState} from "react";
import Dialog from "@ui/Dialog";
import {ErrorMessage, Formik, FormikValues} from "formik";
import styles from "./MeterDeviceDialog.module.scss";
import Select from "@ui/Select";
import TextField from "@ui/TextField";
import DialogFooter from "@ui/Dialog/DialogFooter";
import FilesUpload from "@ui/FilesUpload";
import {ADD_METER_DEVICE_FORM_SCHEMA} from "@common/schemas/schemas";
import {useQuery} from "@apollo/client";
import {GET_METER_TYPES} from "@api/query/query";
import {FileType, ImageType, KeyType, MeterRecordType} from "@typescript/interfaces";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {FilesService} from "@services/filesService";

interface MeterDeviceDialog {
    setOpen: React.Dispatch<boolean>,
    open: boolean,
    onSubmit: (values: FormikValues) => void,
    title: string,
    submitAction: string,
    values?: {
        number: string,
        description: string,
        records: MeterRecordType[],
        images: string[],
        type: {
            key: string,
            name: string
        }
    }
}

export const MeterDeviceDialog: FC<MeterDeviceDialog> = memo((
    {
        setOpen,
        open,
        onSubmit,
        title,
        submitAction,
        values
    }
) => {

    const meterTypesQuery = useQuery(GET_METER_TYPES);

    let [files, setFiles] = useState<FileType[]>([]);
    let [imagesList, setImagesList] = useState<ImageType[]>([]);
    let [meterTypes, setMeterTypes] = useState<KeyType[]>([]);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (values?.images.length) {

            let files = FilesService.toFileObjectsHelper(values.images);
            let images = FilesService.toImageObjectsHelper(values.images);

            setFiles(files as any);
            setImagesList(images as any);
        }
    }, [values?.images]);

    useEffect(() => {
        if (meterTypesQuery.data) {
            let types = meterTypesQuery.data.meter_types;
            setMeterTypes(types);
        }
    }, [meterTypesQuery.data]);

    console.log(meterTypes);

    return (
       <Dialog
           handleClose={handleClose}
           open={open}
           title={title}
       >
            <Formik
                initialValues={{
                    type_key: values?.type.key || "",
                    number: values?.number || "",
                    description: values?.description || "",
                    images: [] as File[]
                }}
                onSubmit={values => {
                    values.images = FilesService.getFiles(files);
                    onSubmit(values);
                }}
                validationSchema={ADD_METER_DEVICE_FORM_SCHEMA}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                }) => (
                    <div className={styles.MeterDeviceDialog}>
                        <div className={styles.MeterDeviceDialog__type}>
                            <Select
                                optionKey={"key"}
                                optionName={"name"}
                                label={"Выберите тип счетчика"}
                                onBlur={handleBlur}
                                name={"type_key"}
                                options={meterTypes}
                                value={values.type_key}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name={"type_key"}
                                render={msg => <ErrorMessageComponent label={msg} />}
                            />
                        </div>
                        <div className={styles.MeterDeviceDialog__number}>
                            <TextField
                                type={"text"}
                                value={values.number}
                                name={"number"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={"Номер счетчика"}
                            />
                            <ErrorMessage
                                name={"number"}
                                render={msg => <ErrorMessageComponent label={msg} />}
                            />
                        </div>
                        <TextField
                            type={"text"}
                            value={values.description}
                            name={"description"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder={"Описание..."}
                        />
                        <ErrorMessage
                            name={"description"}
                            render={msg => <ErrorMessageComponent label={msg} />}
                        />
                        <div className={styles.MeterDeviceDialog__images}>
                            <FilesUpload
                                imagesList={imagesList}
                                title={"Фото паспортов счетчиков"}
                                files={files}
                                setFiles={setFiles}
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

MeterDeviceDialog.displayName = "MeterDeviceDialog";