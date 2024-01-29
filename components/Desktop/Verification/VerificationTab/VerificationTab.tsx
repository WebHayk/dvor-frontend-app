import {FC} from "react";
import TabList from "@ui/Tabs";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import PublicServiceVariant from "./PublicServiceVariant/PublicServiceVariant";
import DocumentsVariant from "./DocumentsVariant/DocumentsVariant";
import TabHeader from "@ui/Tabs/TabHeader";

export const VerificationTab: FC = () => {
    return (
        <div className={"mt-20"}>
            <TabList>
                <TabHeader>
                    <Tab
                        label={"С помощью портала Госуслуги"}
                        index={1}
                    />
                    <Tab
                        label={"С помощью загрузки документов"}
                        index={2}
                    />
                </TabHeader>
                <TabPanel index={1}>
                    <PublicServiceVariant />
                </TabPanel>
                <TabPanel index={2}>
                    <DocumentsVariant />
                </TabPanel>
            </TabList>
        </div>
    )
}
