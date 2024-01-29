import {FC} from "react";
import styles from "./OrganizationInfo.module.scss";
import OrganizationInfoTop from "./OrganizationInfoTop";
import OrganizationInfoTab from "./OrganizationInfoTab";
import {useHousesMapSelector} from "@store/selectors";

export const OrganizationInfo: FC = () => {

    const housesMapState = useHousesMapSelector();

    return (
        housesMapState.organization !== null
        ?
        <div className={styles.OrganizationInfo}>
                <OrganizationInfoTop />
                <OrganizationInfoTab />
        </div>
        :
        null
    )
}