import {FC} from "react";
import TabList from "@ui/Tabs";
import TabHeader from "@ui/Tabs/TabHeader";
import styles from "./OrganizationInfoTab.module.scss";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import CommonInfo from "./CommonInfo";

export const OrganizationInfoTab: FC = () => {
    return (
        <TabList>
            <TabHeader>
                <div className={styles.OrganizationInfoTab}>
                    <Tab label={"Информация"} index={1} />
                    <Tab label={"Тарифы"} index={2} />
                    <Tab label={"Задолженность"} index={3} />
                    <Tab label={"События"} index={4} />
                </div>
            </TabHeader>
            <TabPanel index={1}>
                <CommonInfo />
            </TabPanel>
            <TabPanel index={2}>
                Тарифы
            </TabPanel>
            <TabPanel index={3}>
                Задолженность
            </TabPanel>
            <TabPanel index={4}>
                События
            </TabPanel>
        </TabList>
    )
}