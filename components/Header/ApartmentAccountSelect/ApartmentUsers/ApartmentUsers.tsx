import React, {FC, useEffect} from "react";
import styles from "./ApartmentUsers.module.scss";
import UsersList from "./UsersList";
import {useQuery} from "@apollo/client";
import {APARTMENT_USERS} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useMainSelector} from "@store/selectors";

interface ApartmentUsers {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

export const ApartmentUsers: FC<ApartmentUsers> = (
    {
        open,
        setOpen
    }
) => {

    let state = useMainSelector();
    let apartmentUsers = state.users.data;

    let {setApartmentUsersAction, setApartmentUsersUpdateStateAction} = useActions();
    let apartmentUsersQuery = useQuery(APARTMENT_USERS, {
        variables: {
            user_id: state.user?.user_id
        }
    });

    useEffect(() => {
        apartmentUsersQuery.refetch()
            .then(response => {
                let data = response.data.apartment_users;
                setApartmentUsersAction(data);
            })
            .catch(err => console.log(err))

        if (state.users.isUpdate) {
            setApartmentUsersUpdateStateAction(false);
        }
    }, [state.users.isUpdate])

    const handleClose = () => setOpen(false);

    return (
        open
        ?
        <div className={styles.ApartmentUsers}>
            <div className={styles.ApartmentUsers__top}>
                <p className={styles.ApartmentUsers__title}>Ваши дома</p>
                <button onClick={handleClose}>
                    <img
                        loading={"lazy"}
                        src={"/images/close-black-icon.svg"}
                        alt={"close-icon"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <UsersList
                apartmentUsers={apartmentUsers}
                setOpen={setOpen}
            />
        </div>
        :
        null
    )
}