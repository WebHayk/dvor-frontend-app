import {FC, useEffect, useState} from "react";
import {Marker} from "react-leaflet";
import {ApartmentHouseType} from "@typescript/interfaces";
import {TSJIcon, UKIcon} from "@ui/Markers";
import {useQuery} from "@apollo/client";
import useActions from "@hooks/useActions";
import {useHousesMapSelector} from "@store/selectors";
import {
    GET_HOUSE_INFO,
    GET_MAP_APARTMENT_HOUSES,
    GET_MAP_ORGANIZATION_INFO
} from "@api/query/query";
import {apiService} from "@services/apiService";

interface Info {
    organizationId: number,
    houseId: number
}

export const HousesMarkers: FC = () => {

    let {setOrganizationInfoAction, setHousesInMapAction} = useActions();
    let housesMapState = useHousesMapSelector();
    let [info, setInfo] = useState<Info | null>(null);
    let {data} = useQuery(GET_MAP_APARTMENT_HOUSES);

    useEffect(() => {
        if (data) {
            setHousesInMapAction(data.apartment_houses);
        }
    }, [data])

    useEffect(() => {
        const setOrganizationInfo = async () => {
            if (info !== null) {

                let variablesOrganizationRequest = {
                    id: info?.organizationId
                };

                let variablesHouseInfoRequest = {
                    id: info?.houseId
                };

                let organization = await apiService.queryRequest(GET_MAP_ORGANIZATION_INFO, variablesOrganizationRequest);
                let house = await apiService.queryRequest(GET_HOUSE_INFO, variablesHouseInfoRequest);

                setOrganizationInfoAction(organization.data.organizations_by_pk, house.data.apartment_houses_by_pk);

            }
        }

        setOrganizationInfo();
    }, [info])

    return (
        <div>
            {
                housesMapState.houses.length
                ?
                housesMapState.houses.map((marker: ApartmentHouseType) => {

                    let icon;
                    let lat = parseFloat(marker.lat);
                    let lon = parseFloat(marker.lon);

                    if (marker.organization !== null) {
                        let type = marker.organization.type.name;

                        switch (type) {
                            case "ТСЖ":
                                icon = TSJIcon;
                                break
                            case "УК":
                                icon = UKIcon;
                        }
                    }

                    const handleClick = () => {
                        if (marker.organization !== null) {
                            let organizationId = marker.organization.id;
                            let houseId = marker.id;
                            setInfo({
                                organizationId,
                                houseId
                            });
                        }
                    }

                    return (
                        marker.organization !== null
                        ?
                        <Marker
                            key={lat}
                            eventHandlers={{
                                click: handleClick,
                            }}
                            icon={icon !== undefined ? icon : TSJIcon}
                            position={[lat, lon]}
                        />
                        :
                        null
                    )
                })
                :
                null
            }
        </div>
    )
}