import {FC, useEffect, useState} from "react";
import FiltersList from "@ui/FiltersList";
import {useMetersSelector} from "@store/selectors";
import Chip from "@ui/Chip";
import useActions from "@hooks/useActions";
import {meterTypeNameHelper} from "@common/utils/helpers";

export const RecordsHistoryFilters: FC = () => {

    let state = useMetersSelector();
    let [typesNames, setTypesNames] = useState<string[]>([]);
    let {setMetersFilterTypeAction} = useActions();

    const handleTypesDelete = () => {
        setMetersFilterTypeAction(null);
        setTypesNames([]);
    }

    const removeAllFiltersHandler = () => {
        handleTypesDelete();
        setTypesNames([]);
    }

    useEffect(() => {
        if (state.filters.types) {
            state.filters.types.map((type: string) => {
               let data = meterTypeNameHelper(type);
               setTypesNames(prevState => [...prevState, data]);
            });
        }
    }, [state.filters.types])

    return (
        typesNames.length
        ?
        <FiltersList
            removeAllFiltersHandler={removeAllFiltersHandler}
        >
            {
                typesNames.length
                ?
                <Chip
                    label={`По типам - ${typesNames.join(", ")}`}
                    active={true}
                    onDelete={handleTypesDelete}
                />
                :
                null
            }
        </FiltersList>
        :
        null
    )
}