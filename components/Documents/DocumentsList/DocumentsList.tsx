import {FC, memo, useEffect, useState} from "react";
import {DocumentType} from "@typescript/interfaces";
import DocumentsTable from "../DocumentsTable";
import DocumentsRow from "../DocumentsTable/DocumentsRow";
import WarningDialog from "@ui/Dialog/WarningDialog";
import {DocumentsService} from "@services/documentsService";
import useActions from "@hooks/useActions";
import EditDocumentDialog from "@components/Documents/DocumentsTable/EditDocumentDialog";
import ShowDocumentDialog from "@components/Documents/DocumentsTable/ShowDocumentDialog";
import {documentIconDetectorHelper} from "@common/utils/helpers";

interface DocumentsList {
    array: DocumentType[],
    user_id: number,
    control?: boolean
}

export const DocumentsList: FC<DocumentsList> = memo((
    {
        array,
        user_id,
        control
    }
) => {

    let {setDocumentsUpdateStateAction} = useActions();

    let [documentId, setDocumentId] = useState<number>();
    let [documentPath, setDocumentPath] = useState<string>("");

    let [showOpen, setShowOpen] = useState<boolean>(false);
    let [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    let [editOpen, setEditOpen] = useState<boolean>(false);

    let [values, setValues] = useState<DocumentType>();

    let [isDeleteSubmitted, setIsDeleteSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (isDeleteSubmitted) {
            DocumentsService.deleteDocument(documentId as number, setDeleteOpen, setDocumentsUpdateStateAction);
            setIsDeleteSubmitted(false);
        }
    }, [isDeleteSubmitted]);

    return (
        <>
            <ShowDocumentDialog
                path={documentPath}
                open={showOpen}
                setOpen={setShowOpen}
            />
            {
                values
                &&
                <EditDocumentDialog
                    values={values as DocumentType}
                    open={editOpen}
                    setOpen={setEditOpen}
                />
            }
            <WarningDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                setIsSubmitted={setIsDeleteSubmitted}
            >
                Вы действительно хотите удалить документ?
            </WarningDialog>
            <DocumentsTable>
                {
                    array.length
                        ?
                        array.map((document: DocumentType) => {

                            let {owner_id, id, path, created_at} = document;

                            let isControlCondition = control ? owner_id == user_id : false;

                            const handleEdit = () => {
                                setValues(document);
                                setEditOpen(true);
                            };

                            const handleDelete = () => {
                                setDeleteOpen(true);
                                setDocumentId(id);
                            };

                            const handleRowClick = () => {
                                setShowOpen(true);
                                setDocumentPath(path);
                            };

                            let icon = documentIconDetectorHelper(path);

                            return (
                                <DocumentsRow
                                    created_at={created_at}
                                    handleRowClick={handleRowClick}
                                    key={document.id}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    control={isControlCondition}
                                    icon={icon}
                                    name={document.document_name}
                                />
                            )
                        })
                        :
                        null
                }
            </DocumentsTable>
        </>
    )
});

DocumentsList.displayName = "DocumentsList";