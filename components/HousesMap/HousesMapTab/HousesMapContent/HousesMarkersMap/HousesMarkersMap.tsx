import {FC, useEffect, useState} from "react";
import styles from "./HousesMarkersMap.module.scss";
import HousesMarkers from "./HousesMarkers";
import useActions from "@hooks/useActions";
import MapContainerView from "@ui/MapContainer";
import {useHousesMapSelector} from "@store/selectors";

export const HousesMarkersMap: FC = () => {

    let [map, setMap] = useState<any>(null);
    let [position, setPosition] = useState<[number, number]>();

    let state = useHousesMapSelector();
    const {setOrganizationInfoAction} = useActions();

    useEffect(() => {
        return () => {
            setOrganizationInfoAction(null, null);
        }
    }, []);

    useEffect(() => {
        if (map) {
            map.target.flyTo(position,13, {
                animate: false
            });
        }
    }, [position]);

    useEffect(() => {
        if (state.filters.activeLocality) {
            let lat = parseFloat(state.filters.activeLocality.lat);
            let lon = parseFloat(state.filters.activeLocality.lon);
            setPosition([lat, lon]);
        }
    }, [state.filters.activeLocality]);

    return (
        <MapContainerView
            center={position ? position : [56.90591631669251, 59.9420834896723]}
            whenReady={(map: any) => setMap(map)}
            zoom={13}
            scrollWheelZoom={false}
            className={styles.HousesMarkersMap}
        >
            <HousesMarkers />
        </MapContainerView>
    )
}