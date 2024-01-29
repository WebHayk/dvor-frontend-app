import {FC, useState} from "react";
import {DocumentType} from "@typescript/interfaces";
import {documentIconDetectorHelper} from "@common/utils/helpers";
import Document from "./Document";
import ShowDocumentDialog from "@components/Documents/DocumentsTable/ShowDocumentDialog";

interface DocumentsList {
    array: DocumentType[]
}

export const DocumentsList: FC<DocumentsList> = ({array}) => {

    let [showOpen, setShowOpen] = useState<boolean>(false);
    let [documentPath, setDocumentPath] = useState<string>("");

    return (
        <>
            <ShowDocumentDialog
                path={documentPath}
                open={showOpen}
                setOpen={setShowOpen}
            />
            <ul>
                {
                    array.length
                        ?
                        array.map(document => {

                            let {path, document_name} = document;

                            let icon = documentIconDetectorHelper(path);

                            const handleDocumentOpen = () => {
                                setShowOpen(true);
                                setDocumentPath(path);
                            }

                            return (
                                <Document
                                    key={path}
                                    onClick={handleDocumentOpen}
                                    icon={icon}
                                    document_name={document_name}
                                />
                            )
                        })
                        :
                        null
                }
            </ul>
        </>
    )
}