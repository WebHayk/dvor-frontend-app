import React, {FC, SetStateAction, useState} from "react";
import {Formik} from "formik";
import styles from "../UserVerificationDialog.module.scss";
import RoleItem from "./RoleItem";
import FilesUpload from "@ui/FilesUpload";
import {FileType, VerificationFormType} from "@typescript/interfaces";
import DialogFooter from "@ui/Dialog/DialogFooter";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";

interface VerificationControl {
    files: FileType[],
    setFiles: React.Dispatch<SetStateAction<FileType[]>>,
    handleClose: () => void,
    setValues: React.Dispatch<VerificationFormType>,
    role: string
}

export const VerificationControl: FC<VerificationControl> = (
    {
        files,
        setFiles,
        handleClose,
        setValues,
        role
    }
) => {

    let [error, setError] = useState<string>("");

    return (
        <Formik
            initialValues={{
                role_key: "senior"
            }}
            onSubmit={values => {
                if (!files.length) {
                    setError("Загрузите документы");
                } else {
                    setValues(values);
                    setError("");
                }
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
            }) => (
                <>
                    <p className={styles.VerificationControl__fieldTitle}>Желаемый роль</p>
                    <div role={"group"} className={styles.VerificationControl__row}>
                        <RoleItem
                            checked={values.role_key == "senior"}
                            handleChange={handleChange}
                            role_key={"senior"}
                            label={"Старший, правление"}
                        />
                        {
                            role != "owner"
                            ?
                            <RoleItem
                                checked={values.role_key == "owner"}
                                handleChange={handleChange}
                                role_key={"owner"}
                                label={"Собственник помещения"}
                            />
                            :
                            null
                        }
                        {
                            role != "resident" && role != "owner" && role != "spokesman"
                            ?
                            <RoleItem
                                checked={values.role_key == "resident"}
                                handleChange={handleChange}
                                role_key={"resident"}
                                label={"Житель"}
                            />
                            :
                            null
                        }
                    </div>
                    <FilesUpload
                        title={"Документы"}
                        files={files}
                        setFiles={setFiles}
                    />
                    {
                        error != ""
                        ?
                        <ErrorMessageComponent
                            className={"mt-10"}
                            label={error}
                        />
                        :
                        null
                    }
                    <DialogFooter
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        submitAction={"Отправить на проверку"}
                    />
                </>
            )}
        </Formik>
    )
}
