import React, {FC, useState} from "react";
import styles from "./FilterControl.module.scss";
import ControlItem from "./ControlItem";
import Button from "@ui/Button";
import useActions from "@hooks/useActions";
import {useHousesMapSelector, useMainSelector} from "@store/selectors";
import Checkbox from "@ui/Checkbox";

interface FilterControl {
    setOpen: React.Dispatch<boolean>,
    open: boolean
}

let filtersRenderer = ["УК", "ТСЖ", "КП", "СНТ", "СМД"];

export const FilterControl: FC<FilterControl> = ({setOpen, open}) => {

    let [filters, setFilters] = useState<string[]>([]);

    let allChecked = JSON.stringify(filters) == JSON.stringify(filtersRenderer);

    let state = useMainSelector();
    let housesMapState = useHousesMapSelector();

    let {setFilteredHousesMapAction} = useActions();

    const handleAllChange = () => {
        if (filters.length !== filtersRenderer.length) {
            setFilters(filtersRenderer);
        } else {
            setFilters([]);
        }
    };

    const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {target} = event;
        let label = target.getAttribute("data-value");
        let value = label as string;

        if (event.target.checked && !filters.includes(value)) {
            setFilters([...filters, value as string]);
        } else if (!event.target.checked) {
            let indexArray = filters.indexOf(value);
            let data = filters.filter((element, index) => index !== indexArray);
            setFilters(data);
        }
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (filters.length) {
            setFilteredHousesMapAction(housesMapState.housesCopy, filters);
            setOpen(false);
        }
    }

    return (
        open
            ?
            <div className={styles.FilterControl}>
                <div className={styles.FilterControl__content}>
                    <div className={styles.FilterControl__top}>
                        <p className={styles.FilterControl__title}>Форма правления</p>
                        <button onClick={handleClose} className={styles.FilterControl__close}>
                            <img
                                src={"/images/close-black-icon.svg"}
                                alt={"close-icon"}
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <div className={styles.FilterControl__all}>
                        <p className={styles.FilterControl__label}>Выбрать все</p>
                        <Checkbox
                            name={"check-all"}
                            onChange={handleAllChange}
                            checked={allChecked}
                        />
                    </div>
                </div>
                <div className={styles.FilterControl__list}>
                    <ControlItem
                        filters={filters}
                        icon={"/images/uk-marker-icon.svg"}
                        label={filtersRenderer[0]}
                        onChange={handleControlChange}
                    />
                    <ControlItem
                        filters={filters}
                        icon={"/images/tsj-marker-icon.svg"}
                        label={filtersRenderer[1]}
                        onChange={handleControlChange}
                    />
                    <ControlItem
                        filters={filters}
                        icon={"/images/kp-marker-icon.svg"}
                        label={filtersRenderer[2]}
                        onChange={handleControlChange}
                    />
                    <ControlItem
                        filters={filters}
                        icon={"/images/snt-marker-icon.svg"}
                        label={filtersRenderer[3]}
                        onChange={handleControlChange}
                    />
                    <ControlItem
                        filters={filters}
                        icon={"/images/smd-marker-icon.svg"}
                        label={filtersRenderer[4]}
                        onChange={handleControlChange}
                    />
                </div>
                <div className={styles.FilterControl__submit}>
                    <Button
                        label={"Применить"}
                        type={"button"}
                        onClick={handleSubmit}
                        color={"blue"}
                    />
                </div>
            </div>
            :
            null
    )
}