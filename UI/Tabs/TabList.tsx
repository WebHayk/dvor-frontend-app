import React, {FC, useState} from "react";
import {TabContext} from "@context/context";
import {TabParentType} from "@typescript/interfaces";

export const TabList: FC<TabParentType> = (
    {
        children,
        currentTabProp,
        setCurrentTabProp
    }
) => {

    const [current, setCurrent] = useState<number>(1);

    let currentTab = currentTabProp || current;
    let setCurrentTab = setCurrentTabProp || setCurrent;

    return (
        <>
            <TabContext.Provider value={{
                setCurrentTab,
                currentTab
            }}>
                {children}
            </TabContext.Provider>
        </>
    )
}