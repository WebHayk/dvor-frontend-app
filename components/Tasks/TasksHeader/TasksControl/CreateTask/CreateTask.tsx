import React, {FC, useEffect, useState} from "react";
import Button from "@ui/Button";
import TaskInteractionDialog from "@components/Tasks/TaskInteractionDialog";
import {FormikValues} from "formik";
import {useMutation} from "@apollo/client";
import {INSERT_TASK} from "@api/mutations/mutations";
import {useMainSelector} from "@store/selectors";
import {FilesService} from "@services/filesService";

export const CreateTask: FC = () => {

    let [values, setValues] = useState<FormikValues | null>(null);
    let [open, setOpen] = useState<boolean>(false);

    let [insertTask] = useMutation(INSERT_TASK);
    let mainState = useMainSelector();

    let apartment_house_id = mainState.user?.apartment_user.apartment.apartment_house.id;

    const handleOpen = () => setOpen(!open);

    const insertTaskHandler = (values: FormikValues, files: string[]) => {

        let {description, theme, type_key, urgently} = values;

        insertTask({
            variables: {
                apartment_house_id: parseInt(apartment_house_id),
                description,
                theme,
                type_key,
                urgently: urgently == "Высокая",
                owner_images: files
            }
        })
            .then(() => {
                setOpen(false);
            })
            .catch(err => console.log(err))
    }

    const controlSubmitHandler = () => {

        let {owner_images} = values as FormikValues;

        let files = FilesService.getFiles(owner_images);

        if (files.length) {
            FilesService.filesUploadRequest(files)
                .then(response => {
                    let files = FilesService.imagesArrayCreator(response);
                    insertTaskHandler(values as FormikValues, files);
                })
                .catch(err => console.log(err))
        } else {
            insertTaskHandler(values as FormikValues, []);
        }

    }

    useEffect(() => {
        if (values) {
            controlSubmitHandler();
        }
    }, [values]);

    useEffect(() => {
        if (!open) {
            setValues(null);
        }
    }, [open]);

    return (
        <>
            <Button
                type={"button"}
                onClick={handleOpen}
                color={"blue"}
                icon={"/images/add-white-icon.svg"}
                label={"Создать задачу"}
            />
            <TaskInteractionDialog
                submitAction={"Создать задачу"}
                setValues={setValues}
                open={open}
                title={"Создать задачу"}
                setOpen={setOpen}
            />
        </>
    )
}