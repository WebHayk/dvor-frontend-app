import React, {FC} from "react";
import styles from "./FileUpload.module.scss";

interface FileUpload {
    accept?: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => any,
    id?: string
}

export const FileUpload: FC<FileUpload> = (
    {
        children,
        accept,
        handleChange,
        id
    }
) => {
    return (
        <div className={styles.FileUpload}>
            <label
                htmlFor={id || "file-upload"}
            >
                {children}
            </label>
            <input
                name={"files"}
                multiple={true}
                accept={accept}
                onChange={handleChange}
                id={id || "file-upload"}
                type="file"
            />
        </div>
    )
}