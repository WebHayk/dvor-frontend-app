import {FC, memo, useContext} from "react";
import styles from "../OrganizationTab.module.scss";
import {OrganizationsType} from "@typescript/interfaces";
import DocumentsList from "./DocumentsList";
import {OrganizationContext} from "@context/context";

export const Documents: FC = memo(() => {

    const data: OrganizationsType = useContext(OrganizationContext);

    return (
        <div className={styles.Documents}>
            <DocumentsList array={data.documents} />
        </div>
    )
});

Documents.displayName = "Documents";