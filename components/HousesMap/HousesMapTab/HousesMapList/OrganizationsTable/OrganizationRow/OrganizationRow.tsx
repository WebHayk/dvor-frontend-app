import {FC} from "react";
import TableRow from "@ui/Table/TableRow";
import styles from "./OrganizationRow.module.scss";
import TableCell from "@ui/Table/TableCell";
import {ASSETS_BASE_URL} from "@common/utils/options";
import OrganizationType from "@ui/Organizations/OrganizationType";
import Rating from "@ui/Rating";

interface OrganizationRow {
    address: string,
    organization: {
        type: {
            name: string
        },
        name: string,
        rating: number,
        reviews_count: number,
        logotype_path: string
    },
    handleClick: () => void
}

export const OrganizationRow: FC<OrganizationRow> = (
    {
        organization,
        address,
        handleClick
    }
) => {
    return (
        <TableRow
            type={"hover"}
            onClick={handleClick}
            classes={[styles.OrganizationRow]}
        >
            <TableCell type={"td"}>
                <div className={styles.OrganizationRow__row}>
                    <img
                        alt={"organization-logo"}
                        loading={"lazy"}
                        className={styles.OrganizationRow__logo}
                        src={organization ? ASSETS_BASE_URL + organization.logotype_path : "/images/empty-organization-icon.svg"}
                        width={50}
                        height={50}
                    />
                    <div className={styles.OrganizationRow__right}>
                        {
                            organization
                            ?
                            <div className={styles.OrganizationRow__top}>
                                <OrganizationType
                                    type={organization.type.name}
                                />
                                <p className={styles.OrganizationRow__name}>{organization.name}</p>
                            </div>
                            :
                            null
                        }
                        <p className={styles.OrganizationRow__address}>{address}</p>
                    </div>
                </div>
            </TableCell>
                <TableCell type={"td"}>
                    {
                        organization
                        ?
                        <div className={styles.OrganizationRow__row}>
                            <Rating
                                rating={organization.rating && organization.rating}
                            />
                            <p className={styles.OrganizationRow__rating}>{organization.rating || 0}</p>
                            <p className={styles.OrganizationRow__reviews}>{organization.reviews_count || 0} отзыв</p>
                        </div>
                        :
                        null
                    }
                </TableCell>
        </TableRow>
    )
}