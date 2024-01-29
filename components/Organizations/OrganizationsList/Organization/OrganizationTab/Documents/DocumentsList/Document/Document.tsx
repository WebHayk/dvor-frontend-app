import {FC} from "react";
import styles from "./Document.module.scss";

interface Document {
    icon: string,
    document_name: string,
    onClick: () => void
}

export const Document: FC<Document> = (
    {
        icon,
        document_name,
        onClick
    }
) => {
    return (
        <li onClick={onClick} className={styles.Document}>
            <img
                src={icon}
                alt={"document-icon"}
                width={36}
                height={36}
            />
            {document_name}
        </li>
    )
}