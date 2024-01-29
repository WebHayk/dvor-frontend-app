import {FC} from "react";
import styles from "../../Statement.module.scss";
import TabList from "@ui/Tabs";
import TabHeader from "@ui/Tabs/TabHeader";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import ExpensesContent from "@components/Bank/Statement/StatementContent/ExpensesContent";

export const StatementTab: FC = () => {
    return (
        <TabList>
            <TabHeader className={styles.StatementTab__header}>
                <Tab label={"Расходы"} index={1} />
                <Tab label={"Поступления"} index={2} />
            </TabHeader>
            <TabPanel index={1}>
                <ExpensesContent />
            </TabPanel>
            <TabPanel index={2}>
                Поступления
            </TabPanel>
        </TabList>
    )
}