import {FC} from "react";
import styles from "./HousesMapContent.module.scss";
import OrganizationInfo from "./OrganizationInfo";
import dynamic from "next/dynamic";

const HousesMarkersMap = dynamic(() => import("./HousesMarkersMap"), {ssr: false});

export const HousesMapContent: FC = () => {
    return (
        <div className={styles.HousesMapContent}>
            <OrganizationInfo />
            <HousesMarkersMap />
        </div>
    )
}