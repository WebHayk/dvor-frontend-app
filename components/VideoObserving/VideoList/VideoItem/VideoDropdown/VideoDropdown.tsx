import {FC} from "react";
import Dropdown from "@ui/Dropdown";
import {TOpen} from "@typescript/types";
import DropdownItem from "@ui/Dropdown/DropdownItem";

export const VideoDropdown: FC<TOpen> = ({open}) => {

    const handleClick = () => {
        console.log("Click!");
    }

    return (
        <Dropdown open={open}>
            <DropdownItem
                onClick={handleClick}
                label={"Действие 1"}
                type={"handler"}
            />
            <DropdownItem
                onClick={handleClick}
                label={"Действие 2"}
                type={"handler"}
            />
        </Dropdown>
    )
}