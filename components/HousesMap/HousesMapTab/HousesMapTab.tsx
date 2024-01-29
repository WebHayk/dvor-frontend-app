import {FC} from "react";
import styles from "../HousesMap.module.scss";
import TabList from "@ui/Tabs";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import HousesMapContent from "./HousesMapContent";
import HousesMapList from "./HousesMapList";
import HousesMapPagination from "./HousesMapList/HousesMapPagination";

export const HousesMapTab: FC = () => {
    return (
        <TabList>
            <div className={styles.HousesMapTab}>
                <Tab label={"Карта"} index={1}/>
                <Tab label={"Список"} index={2}/>
            </div>
            <TabPanel index={1}>
                <HousesMapContent/>
            </TabPanel>
            <TabPanel index={2}>
                <div className={styles.HousesMapTab__wrapper}>
                    <HousesMapList/>
                    <HousesMapPagination/>
                </div>
            </TabPanel>
        </TabList>
    )
}