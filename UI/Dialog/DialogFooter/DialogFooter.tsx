import {FC} from "react";
import styles from "@ui/Dialog/Dialog.module.scss";
import Button from "@ui/Button";

interface DialogFooter {
    handleClose: () => void,
    icon?: string,
    handleSubmit: any,
    submitAction: string
}

export const DialogFooter: FC<DialogFooter> = (
    {
        handleClose,
        handleSubmit,
        icon,
        submitAction
    }
) => {
    return (
        <div className={styles.Dialog__footer}>
            <div className={styles.Dialog__cancel}>
                <Button
                    type={"button"}
                    onClick={handleClose}
                    label={"Отмена"}
                    color={"white"}
                />
            </div>
            <Button
                icon={icon?.length ? icon : ""}
                type={"submit"}
                onClick={handleSubmit}
                label={submitAction}
                color={"blue"}
            />
        </div>
    )
}