import React, {FC} from "react";
import styles from "./MessagesActionsNavbar.module.scss";
import Button from "@ui/Button";

interface MessagesActionsNavbar {
    count: number,
    onCancel: () => void,
    onDeleteMessages: () => void
}

export const MessagesActionsNavbar: FC<MessagesActionsNavbar> = (
    {
        count,
        onCancel,
        onDeleteMessages
    }
) => {
    return (
        <div className={styles.MessagesActionsNavbar}>
            <div className={styles.MessagesActionsNavbar__left}>
                <p className={styles.MessagesActionsNavbar__count}>Выбрано: {count}</p>
                <button
                    onClick={onCancel}
                    className={styles.MessagesActionsNavbar__cancel}
                >
                    <img
                        width={20}
                        height={20}
                        alt={"close-icon"}
                        src={"/images/close-black-icon.svg"}
                    />
                </button>
            </div>
            <div className={styles.MessagesActionsNavbar__right}>
                <Button
                    type={"button"}
                    onClick={onDeleteMessages}
                    icon={"/images/delete-icon.svg"}
                    color={"white"}
                />
            </div>
        </div>
    )
}