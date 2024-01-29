import {FC} from "react";
import styles from "../ApartmentHouseInfo.module.scss";
import {useHousesMapSelector} from "@store/selectors";
import {OrganizationChangeType} from "@typescript/interfaces";
import OrganizationChangeItem from "./OrganizationChangeItem";

export const OrganizationChangesList: FC = () => {

    let {apartmentHouse} = useHousesMapSelector();

    return (
        <div className={styles.OrganizationChangesList}>
            {
                apartmentHouse.organizationChanges.length
                    ?
                    apartmentHouse.organizationChanges.map((organization: OrganizationChangeType) => {
                        let {id} = organization
                        return (
                            <OrganizationChangeItem
                                organization={organization}
                                key={id}
                            />
                        )
                    })
                    :
                    null
            }
        </div>
    )
}