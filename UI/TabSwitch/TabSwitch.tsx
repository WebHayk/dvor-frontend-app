import React, {FC, useState} from "react";
import {TabSwitchContext} from "@context/context";
import {TabParentType} from "@typescript/interfaces";

export const TabSwitch: FC<TabParentType> = (
    {
        children,
        currentTabProp,
        setCurrentTabProp
    }
) => {

    let [current, setCurrent] = useState<number>(1);

    let currentIndex = currentTabProp || current;
    let setCurrentIndex = setCurrentTabProp || setCurrent;

    return (
        <>
            <TabSwitchContext.Provider value={{
                currentIndex,
                setCurrentIndex
            }}>
                {children}
            </TabSwitchContext.Provider>
        </>
    )
}