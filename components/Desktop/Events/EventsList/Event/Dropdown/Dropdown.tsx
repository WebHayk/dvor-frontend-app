import {FC} from "react";
import Dropdown from "@ui/Dropdown";
import DropdownItem from "@ui/Dropdown/DropdownItem";
import {TOpen} from "@typescript/types";

const EventDropdown: FC<TOpen> = ({open}) => {
    return (
        <Dropdown open={open}>
            <DropdownItem
                type={"handler"}
                label={"Пожаловаться"}
                onClick={() => "hello world"}
            />
        </Dropdown>
    )
}

export default EventDropdown