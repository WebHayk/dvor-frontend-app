import {FC} from "react";
import Dropdown from "@ui/Dropdown";
import styles from "../AccountControl.module.scss";
import {TOpen} from "@typescript/types";
import DropdownItem from "@ui/Dropdown/DropdownItem";
import Link from "next/link";
import useActions from "@hooks/useActions";
import {useMainSelector} from "@store/selectors";
import VerificationBar from "@ui/VerificationBar";
import {requestsService} from "@services/requestsService";

export const ControlDropdown: FC<TOpen> = ({open}) => {

    let {userLogoutAction} = useActions();
    let state = useMainSelector();

    let isVerified = state.profile?.user.is_verified;

    const handleLogout = () => {
        requestsService.userLogout(userLogoutAction);
    }

    let verificationLabelCondition = isVerified ? "Документы подтверждены" : "Пройти верификацию";

    return (
        <div className={styles.ControlDropdown}>
            <Dropdown open={open}>
                {
                    verificationLabelCondition
                    ?
                    <Link href={"/desktop/verification"}>
                        <a className={styles.ControlDropdown__item}>
                            <VerificationBar
                                label={verificationLabelCondition}
                                isVerified={isVerified}
                            />
                        </a>
                    </Link>
                    :
                    null
                }
                <DropdownItem
                    type={"link"}
                    label={"Настройки профиля"}
                    href={"/desktop/settings"}
                    icon={"/images/user-settings-icon.svg"}
                />
                <DropdownItem
                    type={"handler"}
                    label={"Выход"}
                    onClick={handleLogout}
                    icon={"/images/logout-icon.svg"}
                />
            </Dropdown>
        </div>
    )
}