import React, {FC, useEffect, useState} from "react";
import Dialog from "@ui/Dialog";
import VerificationControl from "./VerificationControl";
import {FileType, VerificationFormType} from "@typescript/interfaces";
import {useMainSelector} from "@store/selectors";
import {apiService} from "@services/apiService";
import {INSERT_APARTMENT_USER_DOCS} from "@api/mutations/mutations";
import useActions from "@hooks/useActions";
import {FilesService} from "@services/filesService";

interface UserVerificationDialog {
    setOpen: React.Dispatch<boolean>,
    open: boolean,
    apartmentUserId: number
}

export const UserVerificationDialog: FC<UserVerificationDialog> = (
    {
        setOpen,
        open,
        apartmentUserId
    }
) => {

    let mainState = useMainSelector();
    let {setApartmentUsersUpdateStateAction} = useActions();

    let [files, setFiles] = useState<FileType[]>([]);
    let [values, setValues] = useState<VerificationFormType | null>();

    const handleClose = () => setOpen(false);

    const insertApartmentUserDocuments = (
        requested_role_key: string,
        files: string[],
        apartmentUserId: number
    ) => {
        apiService.mutationRequest(INSERT_APARTMENT_USER_DOCS, {
            apartment_user_id: apartmentUserId,
            docs: files,
            requested_role_key: requested_role_key
        })
            .then(() => {
                setFiles([]);
                setApartmentUsersUpdateStateAction(true);
                setOpen(false);
                setValues(null);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (values) {
            let filesToRequest = FilesService.getFiles(files);
            let requested_role_key = values.role_key;

            FilesService.filesUploadRequest(filesToRequest)
                .then(response => {
                    let files = FilesService.imagesArrayCreator(response);
                    insertApartmentUserDocuments(requested_role_key, files, apartmentUserId);
                })
        }
    }, [values]);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Заявка на верификацию"}
        >
            <VerificationControl
                role={mainState.user.role.key}
                setValues={setValues}
                handleClose={handleClose}
                setFiles={setFiles}
                files={files}
            />
        </Dialog>
    )
}