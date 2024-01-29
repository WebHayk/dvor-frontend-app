import React, {FC, useState} from "react";
import styles from "./UserItem.module.scss";
import Radio from "@ui/Radio";
import DropdownButton from "@ui/Dropdown/DropdownButton";
import {useMainSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import {useMutation, useQuery} from "@apollo/client";
import {APARTMENT_CHANGE} from "@api/mutations/mutations";
import {USER_SESSION} from "@api/query/query";
import UserItemDropdown from "./UserItemDropdown";
import VerificationBar from "@ui/VerificationBar";

interface UserItem {
    id: number,
    apartmentId: number,
    isVerified: boolean,
    premiseNumber: string,
    thoroughfareName: string,
    setUsersDialogOpen: React.Dispatch<boolean>,
    apartmentNumber: string,
    docs: string[]
}

export const UserItem: FC<UserItem> = (
    {
        isVerified,
        premiseNumber,
        thoroughfareName,
        id,
        docs,
        apartmentId,
        setUsersDialogOpen,
        apartmentNumber
    }
) => {

    let mainState = useMainSelector();

    let [apartmentChange] = useMutation(APARTMENT_CHANGE);
    let [open, setOpen] = useState<boolean>(false);
    let userSessionQuery = useQuery(USER_SESSION)
    let state = useMainSelector();
    let {
        setSessionUserAction,
        setNewsIdAction,
        setCameraCategoriesAction,
        setCameraCategoryAction
    } = useActions();

    let verificationLabelCondition = isVerified ? "Документы подтверждены" : !isVerified && docs.length ? "Документы в проверке" : "Документы не подтверждены";
    let verificationIsVerifiedCondition = isVerified ? isVerified : !isVerified && docs.length ? "pending" : isVerified;

    const handleChange = () => {

        console.log(apartmentId);

        apartmentChange({
            variables: {
                apartment_id: apartmentId
            }
        })
            .then(async () => {

                let userSession = await userSessionQuery.refetch();

                if (userSession) {
                    setSessionUserAction(userSession.data.sessions[0]);
                    setNewsIdAction(null);
                    setUsersDialogOpen(false);
                    setCameraCategoriesAction(["Все камеры"]);
                    setCameraCategoryAction("Все камеры");
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className={styles.UserItem}>
            <div className={styles.UserItem__left}>
                <Radio
                    defaultChecked={state.user?.apartment_user.apartment.id === apartmentId}
                    onChange={handleChange}
                    name={"apartment_user"}
                />
                <div className={styles.UserItem__column}>
                    <p className={styles.UserItem__address}>{thoroughfareName}, {premiseNumber}, кв {apartmentNumber}</p>
                    <VerificationBar
                        label={verificationLabelCondition}
                        isVerified={verificationIsVerifiedCondition}
                    />
                </div>
            </div>
            {
                !isVerified && !docs.length
                ?
                mainState.user.role.key != "senior"
                ?
                <div className={styles.UserItem__right}>
                    <DropdownButton
                        setOpen={setOpen}
                        open={open}
                    />
                    <UserItemDropdown
                        apartmentUserId={id}
                        open={open}
                    />
                </div>
                :
                null
                :
                null
            }
        </div>
    )
}