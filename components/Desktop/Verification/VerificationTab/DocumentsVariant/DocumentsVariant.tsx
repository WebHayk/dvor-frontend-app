import React, {FC, useState} from "react";
import styles from "./DocumentsVariant.module.scss";
import Button from "@ui/Button";
import Document from "./Document/Document";
import ErrorMessageComponent from "@ui/Messages/ErrorMessage";
import {USER_START_VERIFICATION} from "@api/mutations/mutations";
import {useMutation} from "@apollo/client";
import {FilesService} from "@services/filesService";
import {VERIFICATION_ITEMS} from "@common/utils/views";
import useActions from "@hooks/useActions";

const DocumentsVariant: FC = () => {

    let {setGloballyUpdateStateAction} = useActions();

    let [startUserVerification] = useMutation(USER_START_VERIFICATION);

    const [selfieFile, setSelfieFile] = useState<File | null>(null);
    const [documentFile, setDocumentFile] = useState<File | null>(null);

    const [error, setError] = useState<string>("");

    const handleUploadFiles = async () => {
        if (selfieFile && documentFile) {
            try {
                let selfieResponse = await FilesService.verificationFileUploadRequest(selfieFile);
                let documentResponse = await FilesService.verificationFileUploadRequest(documentFile);

                if (documentResponse.path && selfieResponse.path) {

                    let data = {
                        doc_image: documentResponse.path,
                        selfie_image: selfieResponse.path
                    };

                    startUserVerification({
                        variables: data
                    })
                        .then(() => {
                            setGloballyUpdateStateAction(true);
                        })
                        .catch(error => console.log(error))
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setError("Необходимо загрузить все документы");
        }
    }

    const handleSend = () => handleUploadFiles();

    return (
        <div className={styles.Documents}>
            <div className={styles.Documents__content}>

                <div className={styles.Documents__condition}>
                    <div className={styles.Documents__left}>
                        <img
                            loading={"lazy"}
                            src={"/images/photos-icon.svg"}
                            alt={"documents-icon"}
                            width={65}
                            height={65}
                        />
                    </div>
                    <div className={styles.Documents__right}>
                        <p className={styles.Documents__title}>Требования к фотографиям</p>
                        <ul className={styles.Documents__list}>
                            {
                                VERIFICATION_ITEMS.map(item => (
                                    <li key={item} className={styles.Documents__listItem}>
                                        <span>{item}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className={styles.Documents__condition}>
                    <div className={styles.Documents__left}>
                        <img
                            loading={"lazy"}
                            src={"/images/passport-registration.svg"}
                            alt={"documents-icon"}
                            width={65}
                            height={65}
                        />
                    </div>
                    <div className={styles.Documents__right}>
                        <p className={styles.Documents__title}>Зачем это нужно?</p>
                        <span className={styles.Documents__label}>
                            Это обязательная процедура, которая требуется по закону. После подтверждения личности вы получите статус «Идентифицирован» и сможете использовать все функции системы.
                            Данные паспорта хранятся на серверах в зашифрованном виде и не могут передаваться посторонним.
                        </span>
                    </div>
                </div>

                <div className={styles.Documents__files}>
                    <Document
                        file={documentFile}
                        setFile={setDocumentFile}
                        id={"document-file"}
                        label={"Загрузить"}
                        title={"Фото документа"}
                        description={"Загрузите фото документа"}
                        icon={"/images/passport-photo.svg"}
                    />
                    <Document
                        file={selfieFile}
                        setFile={setSelfieFile}
                        id={"selfie-file"}
                        label={"Загрузить"}
                        title={"Селфи с документом"}
                        description={"Загрузите селфи с документом"}
                        icon={"/images/photo-selfie-icon.svg"}
                    />
                </div>
                <div className={styles.Documents__submit}>
                    <ErrorMessageComponent
                        className={styles.Documents__error}
                        label={error}
                    />
                    <Button
                        type={"submit"}
                        onClick={handleSend}
                        color={"blue"}
                        label={"Отправить документы на проверку"}
                    />
                </div>
            </div>
        </div>
    )
}

export default DocumentsVariant