import React, {FC, useState} from "react";
import styles from "./Document.module.scss";
import parentStyles from "../DocumentsVariant.module.scss";
import FileUpload from "@ui/FileUpload";
import {IMAGE_ACCEPT} from "@common/utils/options";
import {FilesService} from "@services/filesService";
import {FileUploadType} from "@typescript/interfaces";

interface Document {
    title: string,
    description: string,
    icon: string,
    setFile: React.Dispatch<File>,
    file: File | null,
    label: string,
    id: string
}

const Document: FC<Document> = (
    {
        title,
        description,
        icon,
        setFile,
        file,
        label,
        id
    }
) => {

    let [image, setImage] = useState<string>(icon);

    const handleFileSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        FilesService.handleFileUpload(event)
            .then(response => {
                let {file, image} = response as FileUploadType;
                setImage(image);
                setFile(file);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.Document}>
            <div className={styles.Document__content}>
                <p className={styles.Document__title}>{title}</p>
                <p className={styles.Document__description}>{description}</p>
                <div className={styles.Document__icon}>
                    <img
                        loading={"lazy"}
                        src={image}
                        alt={"document-icon"}
                        width={100}
                        height={100}
                    />
                </div>
                <FileUpload
                    accept={IMAGE_ACCEPT}
                    id={id}
                    handleChange={handleFileSubmit}
                >
                    <span className={parentStyles.Documents__button}>
                        {label}
                    </span>
                </FileUpload>
            </div>
        </div>
    )
}

export default Document