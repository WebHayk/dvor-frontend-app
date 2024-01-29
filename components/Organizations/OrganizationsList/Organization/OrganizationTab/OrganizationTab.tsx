import {FC} from "react";
import styles from "./OrganizationTab.module.scss";
import TabList from "@ui/Tabs";
import TabHeader from "@ui/Tabs/TabHeader";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import CommonInfo from "./CommonInfo";
import Documents from "./Documents";
import OrganizationReviews from "./OrganizationReviews";

export const OrganizationTab: FC = () => {
    return (
        <TabList>
            <TabHeader>
                <div className={styles.OrganizationTab}>
                    <Tab label={"Общая информация"} index={1} />
                    <Tab label={"Тарифы"} index={2} />
                    <Tab label={"Документы"} index={3} />
                    <Tab label={"Отзывы"} index={4} />
                </div>
            </TabHeader>
            <TabPanel index={1}>
                <CommonInfo />
            </TabPanel>
            <TabPanel index={2}>
                Тарифы
            </TabPanel>
            <TabPanel index={3}>
                <Documents/>
            </TabPanel>
            <TabPanel index={4}>
                <OrganizationReviews/>
            </TabPanel>
        </TabList>
    )
}