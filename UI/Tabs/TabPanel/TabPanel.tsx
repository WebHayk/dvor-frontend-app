import {FC, useContext} from "react";
import {TabContext} from "@context/context";

interface TabPanel {
    index: number
}

export const TabPanel: FC<TabPanel> = (
    {
        index,
        children
    }) => {

    const {currentTab} = useContext(TabContext);

    return (
        currentTab === index
        ?
        <>
          {children}
        </>
        :
        null
    )
}