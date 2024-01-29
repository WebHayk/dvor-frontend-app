import {FC} from "react";
import styles from "../EventsTop/EventsTop.module.scss";
import TabList from "@ui/Tabs";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import EventsList from "../EventsList/EventsList";

const EventsTab: FC = () => {
    return (
        <>
            <TabList>
                <div className={styles.EventsTab}>
                    <div className={styles.EventsTab__list}>
                        <Tab label={"Все события"} index={1}/>
                        <Tab label={"Мои события"} index={2}/>
                        <Tab label={"Архив"} index={3}/>
                    </div>
                    <button className={styles.Events__search}>
                        <img
                            loading={"lazy"}
                            src={"/images/search-black-icon.svg"}
                            alt={"search-icon"}
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
                <TabPanel index={1}>
                    <EventsList/>
                </TabPanel>
                <TabPanel index={2}>
                    Tab two
                </TabPanel>
                <TabPanel index={3}>
                    Tab three
                </TabPanel>
            </TabList>
        </>
    )
}

export default EventsTab