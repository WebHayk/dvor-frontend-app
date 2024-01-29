import {FC, useEffect, useState} from "react";
import styles from "./MeterRecordsHistory.module.scss";
import {GET_METER_RECORDS} from "@api/query/query";
import {MeterRecordType} from "@typescript/interfaces";
import useActions from "@hooks/useActions";
import {useMainSelector, useMetersSelector} from "@store/selectors";
import {useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const RecordsHistoryHeader = dynamic(() => import("./RecordsHistoryHeader"), {ssr: false});
const RecordsHistoryList = dynamic(() => import("./RecordsHistoryList"), {ssr: false});
const RecordsHistoryFilters = dynamic(() => import("./RecordsHistoryFilters"), {ssr: false});

export const MeterRecordsHistoryComponent: FC = () => {

    let router = useRouter();
    let [history, setHistory] = useState<MeterRecordType[]>([]);
    let {setMetersRecordsAction} = useActions();
    let meterRecords = useQuery(GET_METER_RECORDS);
    let state = useMetersSelector();
    let mainState = useMainSelector();

    useEffect(() => {

        let variables = {
            date_to: null,
            date_from: null,
            types: state.filters.types
        };

        meterRecords.refetch(variables)
            .then(response => {
                let data = response.data.meter_records;

                // @ts-ignore
                const datesHistory = [... new Set(data.map(data => data.created_date))];

                for (let i = 0; i < datesHistory.length; i++) {
                    let uniqueDate = datesHistory[i];

                    let records = data.filter((record: MeterRecordType) => {
                        let formattedDate = record.created_date;
                        return formattedDate == uniqueDate;
                    });

                    setHistory((prevState: MeterRecordType[]) => [...prevState, records]);
                }
            })
            .catch(err => console.log(err))

    }, [state.filters.types, mainState.user?.apartment_user]);

    useEffect(() => {
        if (history.length) {
            setMetersRecordsAction(history);
            setHistory([]);
        }
    }, [history]);

    return (
        <div className={styles.MeterRecordsHistory}>
            <RecordsHistoryHeader />
            <RecordsHistoryFilters />
            <RecordsHistoryList />
        </div>
    )
}