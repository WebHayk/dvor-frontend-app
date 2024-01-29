import {FC, useEffect, useState} from "react";
import {TaskType} from "@typescript/interfaces";
import TaskRow from "../TasksTable/TaskRow";
import TasksTable from "@ui/Tasks/TasksTable";
import TaskInteractionDialog from "@components/Tasks/TaskInteractionDialog";
import {FormikValues} from "formik";
import {requestsService} from "@services/requestsService";
import {FilesService} from "@services/filesService";
import {useMainSelector} from "@store/selectors";

interface TasksList {
    array: TaskType[],
    control: boolean
}

export const TasksList: FC<TasksList> = (
    {
        array,
        control
    }
) => {

    let state = useMainSelector();
    let localApartmentId = state.user?.apartment_user.apartment.id;
    let userId = state.user?.user_id;

    let [open, setOpen] = useState<boolean>(false);

    let [values, setValues] = useState<FormikValues>();
    let [initialValues, setInitialValues] = useState<TaskType>({} as TaskType);

    const handleEdit = (files: string[]) => {

        let {id} = initialValues;

        let {
            description,
            theme,
            urgently
        } = values as TaskType;

        requestsService.taskUpdate(
            description as string,
            theme,
            urgently,
            id,
            values?.type_key,
            files,
            setOpen
        );

    }

    useEffect(() => {
        if (values) {

            let {owner_images} = values;

            let currentFiles: string[] = [];
            let uploads: File[] = [];

            FilesService.filterFiles(owner_images, uploads, currentFiles);

            if (uploads.length) {
                FilesService.filesUploadRequest(uploads)
                    .then(response => {
                        let data = FilesService.imagesArrayCreator(response);
                        let files = data.concat(currentFiles);
                        handleEdit(files);
                    })
                    .catch(err => console.log(err))
            } else {
                handleEdit(currentFiles);
            }

        }
    }, [values]);

    return (
        <>
            <TaskInteractionDialog
                submitAction={"Редактировать задачу"}
                open={open}
                initialValues={initialValues}
                setOpen={setOpen}
                title={"Редактировать задачу"}
                setValues={setValues}
            />
            <TasksTable control={control}>
                {
                    array.length
                        ?
                        array.map((task: TaskType) => {

                            let {
                                apartment_id,
                                owner_id,
                                urgently,
                                apartment_house,
                                theme,
                                id,
                                task_status,
                                created_at,
                                tags
                            } = task;

                            const handleEdit = () => {
                                setOpen(true);
                                setInitialValues(task);
                            }

                            let isAvailableForView = userId == owner_id || localApartmentId == apartment_id;

                            return (
                                <TaskRow
                                    isAvailableForView={isAvailableForView}
                                    apartment_id={apartment_id}
                                    owner_id={task.owner_id}
                                    handleEdit={handleEdit}
                                    urgently={urgently}
                                    control={control}
                                    apartment_house={control ? apartment_house : null}
                                    theme={theme}
                                    id={id}
                                    task_status={task_status}
                                    created_at={created_at}
                                    tags={tags}
                                    key={id}
                                />
                            )
                        })
                        :
                        null
                }
            </TasksTable>
        </>
    )
}