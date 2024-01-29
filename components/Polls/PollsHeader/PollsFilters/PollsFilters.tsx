import {FC, memo} from "react";
import {usePollsSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import styles from "./PollsFilters.module.scss";
import Chip from "@ui/Chip";
import {pollTypeNameHelper} from "@common/utils/helpers";
import FiltersList from "@ui/FiltersList";

export const PollsFilters: FC = memo(() => {

    let state = usePollsSelector();
    let {
        setCreationDatePollsAction,
        setTypePollsAction
    } = useActions();

    const handleTypeDelete = () => setTypePollsAction(null);
    const handleCreationDateDelete = () => setCreationDatePollsAction(null);

    const removeAllFiltersHandler = () => {
        handleTypeDelete();
        handleCreationDateDelete();
    }

    return (
        state.filters.type || state.filters.creationDate
        ?
        <FiltersList
            className={styles.PollsFilters}
            removeAllFiltersHandler={removeAllFiltersHandler}
        >
            {
                state.filters.type
                    ?
                    <div className={styles.PollsFilters__item}>
                        <Chip
                            label={`По типу опроса - ${pollTypeNameHelper(state.filters.type)}`}
                            active={true}
                            onDelete={handleTypeDelete}
                        />
                    </div>
                    :
                    null
            }
            {
                state.filters.creationDate
                    ?
                    <div className={styles.PollsFilters__item}>
                        <Chip
                            label={`По дате создании опроса - ${state.filters.creationDate}`}
                            active={true}
                            onDelete={handleCreationDateDelete}
                        />
                    </div>
                    :
                    null
            }
        </FiltersList>
        :
        null
    )
});

PollsFilters.displayName = "PollsFilters";