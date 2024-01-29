import {Dispatch, FC, memo, useEffect, useState} from "react";
import styles from "./Application.module.scss";
import {useMainSelector, useTasksSelector} from "@store/selectors";
import CommonInfo from "./CommonInfo";
import OwnerInfo from "./OwnerInfo";
import TaskTags from "./TaskTags";
import OwnerImages from "./OwnerImages";
import WarningDialog from "@ui/Dialog/WarningDialog";
import {apiService} from "@services/apiService";
import {TASK_CANCEL} from "@api/mutations/mutations";

export const Application: FC = memo(() => {

    let [cancelOpen, setCancelOpen] = useState<boolean>(false); // Состояние открытии диалога подтверждения
    let [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Состояние подтверждения

    let mainState = useMainSelector();
    let state = useTasksSelector();

    let user_id = mainState.user?.user_id;

    let {
        theme,
        description,
        tags,
        owner_images,
        owner_id,
        task_status,
        id
    } = state.task.data;

    const configureTaskCancelView = () => {
        if (user_id == owner_id) {
            if (task_status.key == "open" || task_status.key == "new") {
                return cancelButtonView(setCancelOpen);
            }
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            const taskCancel = async () => {
                try {
                    let response = await apiService.mutationRequest(TASK_CANCEL, {
                        id
                    });
                    setCancelOpen(false);
                    setIsSubmitted(false);
                } catch (error) {
                    console.log(error);
                }
            }

            taskCancel();
        }
    }, [isSubmitted]);

    return (
        <>
            <WarningDialog
                open={cancelOpen}
                setOpen={setCancelOpen}
                setIsSubmitted={setIsSubmitted}
            >
                Вы действительно хотите отменить задачу?
            </WarningDialog>
            <div className={styles.Application}>
                <div className={styles.Application__top}>
                    <div className={styles.Application__left}>
                        <p className={styles.Application__title}>{theme}</p>
                        {tags.length ? <TaskTags tags={tags}/> : null}
                    </div>
                    <div className={styles.Application__right}>
                        {configureTaskCancelView()}
                    </div>
                </div>
                <p className={styles.Application__description}>{description}</p>
                <CommonInfo/>
                <OwnerInfo/>
                <OwnerImages
                    images={owner_images}
                />
            </div>
        </>
    )
});

function cancelButtonView(setOpen: Dispatch<boolean>) {

    const handleOpen = () => setOpen(true);

    return (
        <button onClick={handleOpen} className={styles.Application__cancel}>
            <img
                src={"/images/close-white-icon.svg"}
                alt={"close-icon"}
            />
        </button>
    )
}

Application.displayName = "Application";