import {FC, useEffect, useState} from "react";
import Pagination from "@ui/Pagination";
import {useHousesMapSelector} from "@store/selectors";
import {apiService} from "@services/apiService";
import {GET_SERVICE_ORGANIZATIONS} from "@api/query/query";
import useActions from "@hooks/useActions";
import styles from "../../../HousesMap.module.scss";

let PAGE_SIZE = 10;

export const HousesMapPagination: FC = () => {

    let housesMapState = useHousesMapSelector();
    let [page, setPage] = useState<number>(0);
    let {setServiceOrganizationsAction} = useActions();

    useEffect(() => {

        let variables = {
            offset: PAGE_SIZE * page,
            locality: housesMapState.filters.activeLocality?.name
        };

        apiService.queryRequest(GET_SERVICE_ORGANIZATIONS, variables)
            .then(response => {
                let data = response.data.apartment_houses;

                if (!data.length && page > 0) {
                    setPage(prevState => prevState - 1);
                } else {
                    setServiceOrganizationsAction(data);
                }
            })
            .catch(err => console.log(err))
    }, [page, housesMapState.filters.activeLocality]);

    return (
        <Pagination
            className={styles.HousesMap__pagination}
            setPage={setPage}
            page={page}
            array={housesMapState.serviceOrganizations}
            limit={PAGE_SIZE}
        />
    )
}