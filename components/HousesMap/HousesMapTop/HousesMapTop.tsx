import React, {FC, useEffect, useState} from "react";
import styles from "./HousesMapTop.module.scss";
import Select from "@ui/Select";
import HousesMapFilter from "./HousesMapFilter";
import {useHousesMapSelector} from "@store/selectors";
import {LocalityType} from "@typescript/interfaces";
import useActions from "@hooks/useActions";

export const HousesMapTop: FC = () => {

    let state = useHousesMapSelector();
    let {setActiveLocalityAction} = useActions();

    let [cities, setCities] = useState<string[]>([]);
    let [city, setCity] = useState<string>(state.filters.activeLocality ? state.filters.activeLocality.name : "");

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => setCity(event.target.value);

    useEffect(() => {
        if (state.locality.length) {
            let cities = state.locality.map((locality: LocalityType) => locality.name);
            setCities(cities);
        }
    }, [state.locality]);

    useEffect(() => {
        if (city != "") {
            let activeLocality = state.locality.find((locality: LocalityType) => locality.name == city);
            setActiveLocalityAction(activeLocality);
        }
    }, [city]);

    return (
        <div className={styles.HousesMapTop}>
            <div className={styles.HousesMapTop__left}>
                <p className={styles.HousesMapTop__title}>Дома на карте</p>
                <div className={styles.HousesMapTop__city}>
                    <Select
                        label={"Город"}
                        options={cities}
                        value={city}
                        onChange={handleCityChange}
                    />
                </div>
            </div>
            <div className={styles.HouseMapTop__right}>
                <HousesMapFilter />
            </div>
        </div>
    )
}