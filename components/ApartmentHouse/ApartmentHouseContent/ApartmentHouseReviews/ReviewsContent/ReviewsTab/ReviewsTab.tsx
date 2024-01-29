import {FC, useEffect, useState} from "react";
import TabHeader from "@ui/Tabs/TabHeader";
import Tab from "@ui/Tabs/Tab";
import TabPanel from "@ui/Tabs/TabPanel";
import {useHousesMapSelector} from "@store/selectors";
import ReviewsList from "./ReviewsList";
import {useRouter} from "next/router";
import TabList from "@ui/Tabs";

export const ReviewsTab: FC = () => {

    let state = useHousesMapSelector();
    let router = useRouter();

    let [currentTab, setCurrentTab] = useState<number>(1);

    useEffect(() => {
        let path = router.asPath;

        if (path.includes("?reviews=local")) {
            setCurrentTab(2);
        }
    }, []);

    return (
        <TabList
            currentTabProp={currentTab}
            setCurrentTabProp={setCurrentTab}
        >
            <TabHeader>
                <Tab
                    index={1}
                    label={"Все отзывы"}
                />
                <Tab
                    index={2}
                    label={"Мои отзывы"}
                />
            </TabHeader>
            <TabPanel index={1}>
                <ReviewsList
                    array={state.apartmentHouse.reviews}
                />
            </TabPanel>
            <TabPanel index={2}>
                <ReviewsList
                    array={state.apartmentHouse.myReviews}
                />
            </TabPanel>
        </TabList>
    )
}