import {FC} from "react";
import styles from "./OrganizationChangeItem.module.scss";
import {OrganizationChangeType} from "@typescript/interfaces";
import {organizationIconDetector} from "@common/utils/helpers";

interface OrganizationChangeItemModel {
    organization: OrganizationChangeType
}

export const OrganizationChangeItem: FC<OrganizationChangeItemModel> = (
    {
        organization
    }
) => {

    let {
        end_date,
        start_date
    } = organization;

    let {
        logotype_path,
        name
    } = organization.organization;

    let imageCondition = organizationIconDetector(logotype_path);
    let endDateCondition = end_date ? end_date : "На данный момент";

    return (
        <div className={styles.OrganizationChangeItem}>
            <img
                width={60}
                height={60}
                src={imageCondition}
                alt={"organization-logo"}
            />
            <div className={styles.OrganizationChangeItem__right}>
                <p className={styles.OrganizationChangeItem__name}>{name}</p>
                <p className={styles.OrganizationChangeItem__date}>{start_date} - {endDateCondition}</p>
            </div>
        </div>
    )
}