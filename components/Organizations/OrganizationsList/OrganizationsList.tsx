import {FC, memo} from "react";
import styles from "./OrganizationsList.module.scss";
import Organization from "./Organization";
import {OrganizationsType} from "@typescript/interfaces";
import {useOrganizationsSelector} from "@store/selectors";

export const OrganizationsList: FC = memo(() => {

    let state = useOrganizationsSelector();

    return (
        <div className={styles.OrganizationsList}>
            {
                state.organizations.length
                ?
                state.organizations.map((organization: OrganizationsType) => {
                    return (
                        <Organization
                            data={organization}
                            key={organization.id}
                        />
                    )
                })
                :
                <p>Пока нет организации</p>
            }
        </div>
    )
});

OrganizationsList.displayName = "OrganizationsList";
