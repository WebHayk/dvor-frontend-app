import {FC, useState} from "react";
import styles from "../UserItem.module.scss";
import Dropdown from "@ui/Dropdown";
import DropdownItem from "@ui/Dropdown/DropdownItem";
import UserVerificationDialog from "../UserVerificationDialog";

interface UserItemDropdown {
    open: boolean,
    apartmentUserId: number
}

export const UserItemDropdown: FC<UserItemDropdown> = (
    {
        open,
        apartmentUserId
    }
) => {

    // state show модального окно для верификации
    let [verificationOpen, setVerificationOpen] = useState<boolean>(false);

    const handleVerificationDialogShow = () => setVerificationOpen(true);

    return (
        <>
            <UserVerificationDialog
                apartmentUserId={apartmentUserId}
                setOpen={setVerificationOpen}
                open={verificationOpen}
            />
            <Dropdown
                className={styles.UserItemDropdown}
                open={open}
            >
                <DropdownItem
                    onClick={handleVerificationDialogShow}
                    label={"Пройти верификацию"}
                    type={"handler"}
                />
            </Dropdown>
        </>
    )
}