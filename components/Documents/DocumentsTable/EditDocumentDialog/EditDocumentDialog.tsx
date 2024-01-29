import {Dispatch, FC} from "react";
import styles from "../../Documents.module.scss";
import {DocumentType} from "@typescript/interfaces";
import Dialog from "@ui/Dialog";
import {ErrorMessage, Formik} from "formik";
import {useDocumentsSelector} from "@store/selectors";
import Select from "@ui/Select";
import TextField from "@ui/TextField";
import DialogFooter from "@ui/Dialog/DialogFooter";
import {EDIT_DOCUMENT_FORM_SCHEMA} from "@common/schemas/schemas";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {DocumentsService} from "@services/documentsService";
import useActions from "@hooks/useActions";

interface EditDocumentDialog {
    open: boolean,
    values: DocumentType,
    setOpen: Dispatch<boolean>
}

export const EditDocumentDialog: FC<EditDocumentDialog> = (
    {
        open,
        values,
        setOpen
    }
) => {

    let {
        document_name,
        target_group,
        id
    } = values;

    let state = useDocumentsSelector();
    let {setDocumentsUpdateStateAction} = useActions();

    let {
        targetGroups
    } = state;

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Редактировать документ"}
        >
            <Formik
                initialValues={{
                    document_name,
                    target_group_key: target_group.key
                }}
                onSubmit={values => {
                    let {document_name, target_group_key} = values;
                    DocumentsService.updateDocument(id, document_name, target_group_key, setOpen, setDocumentsUpdateStateAction);
                }}
                validationSchema={EDIT_DOCUMENT_FORM_SCHEMA}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit
                }) => (
                    <div className={styles.EditDocumentDialog}>
                        <TextField
                            placeholder={"Название документа"}
                            type={"text"}
                            value={values.document_name}
                            name={"document_name"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <ErrorMessage
                            name={"document_name"}
                            render={msg => <ErrorMessageComponent label={msg} />}
                        />
                        <Select
                            label={"Доступ"}
                            options={targetGroups}
                            value={values.target_group_key}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            optionKey={"key"}
                            optionName={"name"}
                            name={"target_group_key"}
                        />
                        <ErrorMessage
                            name={"target_group_key"}
                            render={msg => <ErrorMessageComponent label={msg} />}
                        />
                        <DialogFooter
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            submitAction={"Подтвердить"}
                        />
                    </div>
                )}
            </Formik>
        </Dialog>
    )
}