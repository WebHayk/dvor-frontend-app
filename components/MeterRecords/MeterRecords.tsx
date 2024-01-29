import {FC, useEffect} from "react";
import styles from "./MeterRecords.module.scss";
import {useQuery} from "@apollo/client";
import {GET_METERS} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useMainSelector} from "@store/selectors";
import dynamic from "next/dynamic";

const MeterRecordsHeader = dynamic(() => import("./MeterRecordsHeader"), {ssr: false});
const MeterList = dynamic(() => import("./MeterList"), {ssr: false});

export const MeterRecordsComponent: FC = () => {

    const mainState = useMainSelector();
    const meters = useQuery(GET_METERS);
    const {setMetersAction} = useActions();

    useEffect(() => {
        meters.refetch()
            .then(response => {
                let metersResponse = response.data.meters;
                setMetersAction(metersResponse);
            })
            .catch(err => console.log(err))
    }, [mainState.user?.apartment_user])

    return (
        <div className={styles.MeterRecords}>
            <MeterRecordsHeader/>
            <div className={styles.MeterRecords__list}>
                <MeterList />
            </div>
        </div>
    )
}