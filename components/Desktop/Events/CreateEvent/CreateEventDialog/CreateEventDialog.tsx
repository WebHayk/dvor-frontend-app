import React, {FC, useState} from 'react';
import Dialog from "@ui/Dialog";
import styles from "./CreateEventDialog.module.scss";
import FilesUpload from "@ui/FilesUpload";
import {IMAGE_ACCEPT} from "@common/utils/options";
import {ImageType} from "@typescript/interfaces";
import DialogFooter from "@ui/Dialog/DialogFooter";

interface CreateEventDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

const CreateEventDialog: FC<CreateEventDialog> = (
    {
        open,
        setOpen}
) => {

    const handleClose = () => setOpen(false);
    let [files, setFiles] = useState<ImageType[]>([]);

    const handleSubmit = () => {
        console.log("Created!");
    }

    return (
        <Dialog
            title={"Создать событие"}
            handleClose={handleClose}
            open={open}
        >
            <div className={styles.CreateEventDialog}>
                <div className={styles.CreateEventDialog__top}>
                    <div className={styles.CreateEventDialog__profile}> </div>
                    <div className={styles.CreateEventDialog__left}>
                        <p className={styles.CreateEventDialog__name}>Соколова Александра</p>
                        <p className={styles.CreateEventDialog__address}>Пушкина, 48</p>
                    </div>
                </div>
                <div className={styles.CreateEventDialog__content}>
                    <textarea
                        placeholder={"Что вы хотите рассказать?"}
                        className={styles.CreateEventDialog__text}
                    />
                </div>
                {/*<FilesUpload*/}
                {/*    title={"Фото"}*/}
                {/*    files={files}*/}
                {/*    setFiles={setFiles}*/}
                {/*    accept={IMAGE_ACCEPT}*/}
                {/*/>*/}
                <DialogFooter
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    submitAction={"Создать событие"}
                />
            </div>
        </Dialog>
    );
};

export default CreateEventDialog;