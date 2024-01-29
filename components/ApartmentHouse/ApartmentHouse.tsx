import {FC, useEffect} from "react";
import styles from "./ApartmentHouse.module.scss";
import HouseBanner from "@ui/Houses/HouseBanner";
import ApartmentHouseTab from "./ApartmentHouseTab";
import {useRouter} from "next/router";
import {apiService} from "@services/apiService";
import {APARTMENT_HOUSE_ORGANIZATION_CHANGES_LIST, GET_APARTMENT_HOUSE_ONE} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useHousesMapSelector} from "@store/selectors";

export const ApartmentHouseComponent: FC = () => {

    let router = useRouter();
    let id = router.query?.id;
    let state = useHousesMapSelector();

    let {
        setApartmentHouseOneAction,
        setApartmentHouseOrganizationChangesAction
    } = useActions();

    useEffect(() => {
        if (id) {
            apiService.queryRequest(GET_APARTMENT_HOUSE_ONE, {
                id
            })
                .then(response => {
                    let data = response.data.apartment_houses_by_pk;
                    setApartmentHouseOneAction(data);
                })
                .catch(err => console.log(err))

            apiService.queryRequest(APARTMENT_HOUSE_ORGANIZATION_CHANGES_LIST, {
                apartment_house_id: id
            })
                .then(response => {
                    let {apartment_house_organization_changes} = response.data;
                    setApartmentHouseOrganizationChangesAction(apartment_house_organization_changes);
                })
                .catch(err => console.log(err))
        }
    }, [id])

    return (
        <div className={styles.ApartmentHouse}>
            {
                state.apartmentHouse.info
                ?
                <>
                    <HouseBanner
                        showRating={true}
                        logotype_path={state.apartmentHouse.info.organization?.logotype_path || null}
                        type={state.apartmentHouse.info.organization?.type.name || null}
                        organizationName={state.apartmentHouse.info.organization?.name || null}
                        thoroughfare_name={state.apartmentHouse.info.thoroughfare_name}
                        premise_number={state.apartmentHouse.info.premise_number}
                        rating={state.apartmentHouse.info.organization?.rating || null}
                        reviews_count={state.apartmentHouse.info.organization?.reviews_count || null}
                        control={false}
                    />
                    <ApartmentHouseTab />
                </>
                :
                null
            }
        </div>
    )
}