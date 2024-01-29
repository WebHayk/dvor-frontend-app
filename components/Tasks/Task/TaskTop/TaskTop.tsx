import {Dispatch, FC, memo, useState} from "react";
import styles from "./TaskTop.module.scss";
import BackButton from "@ui/Button/BackButton";
import TaskAlert from "@ui/Tasks/TaskAlert";
import {useMainSelector, useTasksSelector} from "@store/selectors";
import Button from "@ui/Button";
import TaskEstimateDialog from "./TaskEstimateDialog";
import {useMutation} from "@apollo/client";
import {TASK_CHAT_INSERT} from "@api/mutations/mutations";

interface TaskTop {
    setCurrentIndex: Dispatch<number>
}

export const TaskTop: FC<TaskTop> = memo((
    {
        setCurrentIndex
    }
) => {

    let state = useTasksSelector();
    let mainState = useMainSelector();
    let urgently = state.task.data?.urgently ? "Высокая" : "Низкая";

    let [ratingOpen, setRatingOpen] = useState<boolean>(false);

    let taskData = state.task.data;

    let task_id = taskData?.id;
    let ownerId = taskData?.owner_id;
    let statusKey = taskData?.task_status.key;
    let userId = mainState.user?.user_id;

    let user_operator_chat = taskData?.operator_user_chat;
    let operator_id = taskData?.operator_id;

    let worker = taskData?.worker;
    let user_worker_chat = taskData?.worker_user_chat;

    let [taskChatInsert] = useMutation(TASK_CHAT_INSERT);

    const handleRatingDialogOpen = () => setRatingOpen(true);

    let handleInsertChat = (chat_name: string, chat_type: string) => {
        taskChatInsert({
            variables: {
                task_id,
                chat_name,
                chat_type
            }
        })
            .then(() => {
                setCurrentIndex(2);
            })
            .catch(err => console.log(err))
    }

    const handleCreateUserOperatorChat = () => {
        handleInsertChat(`Чат диспетчер-заявитель ${task_id}`, "operator_user");
    };

    const handleCreateUserWorkerChat = () => {
        handleInsertChat(`Чат исполнитель-заявитель ${task_id}`, "worker_user");
    };

    return (
        <>
            <TaskEstimateDialog
                open={ratingOpen}
                setOpen={setRatingOpen}
            />
            <div className={styles.TaskTop}>
                <div className={styles.TaskTop__content}>
                    <BackButton
                        path={"/tasks"}
                    />
                    {
                        statusKey == "closed_succesful"
                            ?
                            ownerId == userId && !taskData?.rating
                                ?
                                <Button
                                    color={"blue"}
                                    label={"Оценить выполнение"}
                                    type={"button"}
                                    onClick={handleRatingDialogOpen}
                                />
                                :
                                null
                            :
                            null
                    }
                    {
                        statusKey != "closed_succesful" && statusKey != "canceled"
                        ?
                        <div className={styles.TaskTop__row}>
                            {
                                operator_id && !user_operator_chat && ownerId == userId
                                    ?
                                    <Button
                                        type={"button"}
                                        onClick={handleCreateUserOperatorChat}
                                        color={"blue"}
                                        label={"Начать диалог с диспетчером"}
                                    />
                                    :
                                    null
                            }
                            {
                                worker && !user_worker_chat && ownerId == userId
                                    ?
                                    <Button
                                        type={"button"}
                                        onClick={handleCreateUserWorkerChat}
                                        color={"blue"}
                                        label={"Начать диалог с исполнителем"}
                                    />
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                    }
                </div>
                {
                    taskData
                    ?
                    <TaskAlert
                        className={styles.TaskTop__alert}
                        urgently={urgently}
                        id={taskData.id}
                        date={taskData.created_at}
                        status={taskData.task_status}
                    />
                    :
                    null
                }
            </div>
        </>
    )
});

TaskTop.displayName = "TaskTop";