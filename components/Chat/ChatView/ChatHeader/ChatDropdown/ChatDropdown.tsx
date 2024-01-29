import React, {FC} from "react";
import Dropdown from "@ui/Dropdown";
import DropdownItem from "@ui/Dropdown/DropdownItem";

interface ChatDropdown {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const ChatDropdown: FC<ChatDropdown> = (
    {
        open,
        setOpen
    }
) => {

    const handleComplain = () => setOpen(false);

    return (
        <Dropdown open={open}>
            <DropdownItem
                label={"Пожаловаться"}
                type={"handler"}
                onClick={handleComplain}
            />
        </Dropdown>
    )
}