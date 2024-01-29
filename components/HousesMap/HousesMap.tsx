import {FC, useEffect} from "react";
import HousesMapTop from "./HousesMapTop";
import HousesMapTab from "./HousesMapTab";
import styles from "./HousesMap.module.scss";
import {apiService} from "@services/apiService";
import {GET_LOCALITY} from "@api/query/query";
import useActions from "@hooks/useActions";

export const HousesMap: FC = () => {

    let {setLocalityAction} = useActions();

    useEffect(() => {
        apiService.queryRequest(GET_LOCALITY)
            .then(response => {
                let data = response.data.locality;
                setLocalityAction(data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.HousesMap}>
            <HousesMapTop />
            <HousesMapTab />
        </div>
    )
}

