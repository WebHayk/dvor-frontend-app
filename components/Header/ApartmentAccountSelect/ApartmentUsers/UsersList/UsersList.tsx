import React, {FC} from "react";
import styles from "../ApartmentUsers.module.scss";
import UserItem from "./UserItem";
import {useMainSelector} from "@store/selectors";
import {ApartmentUserType} from "@typescript/interfaces";

interface UsersList {
    setOpen: React.Dispatch<boolean>,
    apartmentUsers: ApartmentUserType[]
}

export const UsersList: FC<UsersList> = (
    {
        setOpen,
        apartmentUsers
    }
) => {
    return (
       <div className={styles.UsersList}>
           {
               apartmentUsers.length
               ?
               apartmentUsers.map((apartmentUser: ApartmentUserType) => {
                   return (
                       <UserItem
                           docs={apartmentUser.docs}
                           setUsersDialogOpen={setOpen}
                           id={apartmentUser.id}
                           apartmentNumber={apartmentUser.apartment.apartment_number as string}
                           apartmentId={apartmentUser.apartment.id}
                           isVerified={apartmentUser.is_verified}
                           premiseNumber={apartmentUser.apartment.apartment_house.premise_number}
                           thoroughfareName={apartmentUser.apartment.apartment_house.thoroughfare_name}
                           key={apartmentUser.id}
                       />
                   )
               })
               :
               null
           }
       </div>
    )
}