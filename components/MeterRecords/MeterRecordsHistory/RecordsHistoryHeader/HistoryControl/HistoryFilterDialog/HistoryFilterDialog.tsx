import React, {FC, useEffect, useState} from "react";
import styles from "../../RecordsHistoryHeader.module.scss";
import FilterDialog from "@ui/Dialog/FilterDialog";
import Chip from "@ui/Chip";
import {KeyType} from "@typescript/interfaces";
import useActions from "@hooks/useActions";
import {useMetersSelector} from "@store/selectors";

interface HistoryFilterDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    types: KeyType[]
}

export const HistoryFilterDialog: FC<HistoryFilterDialog> = (
    {
        open,
        setOpen,
        types
    }
) => {

    let {setMetersFilterTypeAction} = useActions();

    let state = useMetersSelector();

    let [keys, setKeys] = useState<string[]>([]);

    const handleSubmit = () => {
        if (keys.length) {
            setMetersFilterTypeAction(keys);
        } else {
            setMetersFilterTypeAction(null);
        }

        setOpen(false);
    }

    useEffect(() => {
        if (!state.filters.types) {
            setKeys([]);
        }
    }, [state.filters.types])

    return (
        <FilterDialog
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            title={"Фильтры"}
            className={styles.HistoryFilterDialog}
        >
            <div className={styles.HistoryFilterDialog__row}>
                <p className={styles.HistoryFilterDialog__label}>Типы счетчиков</p>
                {
                    types.length
                    ?
                    types.map((type: KeyType) => {

                        let {key} = type;

                        const handleTypeChange = () => {

                            if (!keys.includes(key)) {
                                setKeys(prevState => [...prevState, key]);
                            } else {
                                setKeys(keys.filter(element => element != key));
                            }

                        }

                        return (
                            <Chip
                                className={styles.HistoryFilterDialog__chip}
                                key={type.key}
                                onClick={handleTypeChange}
                                label={type.name}
                                active={keys.includes(key)}
                            />
                        )
                    })
                    :
                    null
                }
            </div>
        </FilterDialog>
    )
}