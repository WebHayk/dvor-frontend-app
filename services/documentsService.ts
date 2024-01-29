import {FormikValues} from "formik";
import {Dispatch} from "react";
import {apiService} from "@services/apiService";
import {DELETE_DOCUMENT, UPDATE_DOCUMENT} from "@api/mutations/mutations";

export class DocumentsService {
    static documentsUploadRequest = (
        values: FormikValues,
        file: File,
        setOpen: Dispatch<boolean>,
        setDocumentsUpdateState: any
    ) => {
        let {
            target_group_key,
            apartment_house_id,
            type_key,
            document_name
        } = values;

        let data = new FormData();
        data.append("document_name", document_name);
        data.append("session_id", localStorage.getItem("token") as string);
        data.append("target_group_key", target_group_key);
        data.append("type_key", type_key);
        data.append("apartment_house_id", apartment_house_id ? apartment_house_id : null);
        data.append("file", file);

        fetch(`${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}docs/upload`, {
            body: data,
            method: "POST"
        })
            .then(response => {
                setOpen(false);
                setDocumentsUpdateState(true);
            })
            .catch(err => console.log(err))
    }

    static deleteDocument = (
        id: number,
        setOpen: Dispatch<boolean>,
        setDocumentsUpdateState: any
    ) => {
        apiService.mutationRequest(DELETE_DOCUMENT, {
            id
        })
            .then(() => {
                setOpen(false);
                setDocumentsUpdateState(true);
            })
            .catch(error => console.log(error))
    }

    static updateDocument = (
        id: number,
        document_name: string,
        target_group_key: string,
        setOpen: Dispatch<boolean>,
        setDocumentsUpdateState: any
    ) => {
        apiService.mutationRequest(UPDATE_DOCUMENT, {
            id,
            document_name,
            target_group_key
        })
            .then(() => {
                setOpen(false);
                setDocumentsUpdateState(true);
            })
            .catch(err => console.log(err))
    }
}