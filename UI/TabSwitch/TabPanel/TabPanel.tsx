import {FC, ReactNode, useContext} from "react";
import {TabSwitchContext} from "@context/context";

interface TabPanel {
    index: number,
    children: ReactNode
}

export const TabPanel: FC<TabPanel> = (
    {
        index,
        children
    }
) => {

    const {currentIndex} = useContext(TabSwitchContext);

    return (
        currentIndex === index
        ?
        <>
            {children}
        </>
        :
        null
    )
}