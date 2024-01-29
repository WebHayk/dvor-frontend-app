import {FC, useState} from "react";
import styles from "./DocumentsHeader.module.scss";
import Button from "@ui/Button";
import AddDocumentDialog from "./AddDocumentDialog";
import RoleElementProvider from "@hoc/RoleElementProvider";

export const DocumentsHeader: FC = () => {

    let [open, setOpen] = useState<boolean>(false);

    const handleShowDialog = () => setOpen(true);

    return (
        <div className={styles.DocumentsHeader}>
            <p className={styles.DocumentsHeader__title}>Документы</p>
            <RoleElementProvider roles={["senior"]}>
                <Button
                    type={"button"}
                    onClick={handleShowDialog}
                    color={"blue"}
                    icon={"/images/add-white-icon.svg"}
                    label={"Добавить документ"}
                />
            </RoleElementProvider>
            <AddDocumentDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}