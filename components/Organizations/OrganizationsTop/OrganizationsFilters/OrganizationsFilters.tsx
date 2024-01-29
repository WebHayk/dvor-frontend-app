import {FC, memo} from "react";
import FiltersList from "@ui/FiltersList";
import {useOrganizationsSelector} from "@store/selectors";
import Chip from "@ui/Chip";
import {organizationTypeHelper} from "@common/utils/helpers";
import useActions from "@hooks/useActions";

export const OrganizationsFilters: FC = memo(() => {
    
    let state = useOrganizationsSelector();
    let {setSearchOrganizationsTypeAction} = useActions();

    const handleTypeDelete = () => setSearchOrganizationsTypeAction("");

    const removeAllFiltersHandler = () => {
        setSearchOrganizationsTypeAction("");
    }
    
    return (
        state.filters.type !== ""
        ?
        <FiltersList
            removeAllFiltersHandler={removeAllFiltersHandler}
        >
            {
                state.filters.type !== ""
                ?
                <Chip
                    label={`По типу - ${organizationTypeHelper(state.filters.type)}`}
                    active={true}
                    onDelete={handleTypeDelete}
                />
                :
                null
            }
        </FiltersList>
        :
        null
    )
});

OrganizationsFilters.displayName = "OrganizationsFilters";