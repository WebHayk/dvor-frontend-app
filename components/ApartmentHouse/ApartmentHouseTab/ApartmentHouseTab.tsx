import {FC, useEffect, useState} from "react";
import TabList from "@ui/Tabs";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import styles from "../ApartmentHouse.module.scss";
import ApartmentHouseInfo from "../ApartmentHouseContent/ApartmentHouseInfo";
import {useHousesMapSelector} from "@store/selectors";
import {useRouter} from "next/router";
import ApartmentHouseReviews from "../ApartmentHouseContent/ApartmentHouseReviews";

export const ApartmentHouseTab: FC = () => {

    let [currentTab, setCurrentTab] = useState<number>(1);
    let router = useRouter();
    let state = useHousesMapSelector();

    useEffect(() => {
        let path = router.asPath;
        if (path.includes("?reviews")) setCurrentTab(5);
    }, [router.asPath]);

    return (
        <TabList
            setCurrentTabProp={setCurrentTab}
            currentTabProp={currentTab}
        >
            <div className={styles.ApartmentHouseTab}>
                <Tab
                    className={styles.ApartmentHouseTab__tab}
                    label={"Информация"}
                    index={1}
                />
                <Tab
                    className={styles.ApartmentHouseTab__tab}
                    label={"Тарифы"}
                    index={2}
                />
                <Tab
                    className={styles.ApartmentHouseTab__tab}
                    label={"Задолженность"}
                    index={3}
                />
                <Tab
                    className={styles.ApartmentHouseTab__tab}
                    label={"События"}
                    index={4}
                />
                {
                    state.apartmentHouse.info?.organization
                    &&
                    <Tab
                        className={styles.ApartmentHouseTab__tab}
                        label={"Выполненные заявки"}
                        index={5}
                    />
                }
            </div>
            <TabPanel index={1}>
                <ApartmentHouseInfo/>
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
            <TabPanel index={5}>
                <ApartmentHouseReviews/>
            </TabPanel>
        </TabList>
    )
}