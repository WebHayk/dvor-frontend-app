import React, {FC, memo, useEffect, useState} from "react";
import styles from "./PollsFilterDialog.module.scss";
import FilterDialog from "@ui/Dialog/FilterDialog";
import DateField from "@ui/DateField";
import Select from "@ui/Select";
import {useQuery} from "@apollo/client";
import {GET_POLLS_QUESTION_TYPES} from "@api/query/query";
import {dateToFormattedHelper, pollTypeNameHelper} from "@common/utils/helpers";
import {KeyType} from "@typescript/interfaces";
import useActions from "@hooks/useActions";

interface PollsFilterDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>
}

interface State {
    creationDate: string,
    type: string
}

export const PollsFilterDialog: FC<PollsFilterDialog> = memo((
    {
        open,
        setOpen
    }
) => {

    let {data} = useQuery(GET_POLLS_QUESTION_TYPES);
    let {
        setCreationDatePollsAction,
        setTypePollsAction
    } = useActions();

    let [state, setState] = useState<State>({
        creationDate: "",
        type: ""
    });
    let [types, setTypes] = useState<KeyType[]>([]);

    const handleSubmit = () => {

        if (state.creationDate !== "") {
            let date = dateToFormattedHelper(state.creationDate, "yyyy/mm/dd");
            setCreationDatePollsAction(date);
        } else {
            setCreationDatePollsAction(null);
        }

        if (state.type !== "") {
            setTypePollsAction(state.type);
        } else {
            setTypePollsAction(null);
        }

        setOpen(false);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setState({
        ...state,
        creationDate: event.target.value
    });

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => setState({
       ...state,
       type: event.target.value
    });

    useEffect(() => {
        if (data) {
            let response = data.poll_question_types;

            for (let i = 0; i < response.length; i++) {
                let key: string = response[i].key;
                let name: string = pollTypeNameHelper(key);

                let type: KeyType = {
                    key,
                    name
                };

                setTypes(prevState => [...prevState, type]);
            }
        }
    }, [data])

    return (
        <FilterDialog
            open={open}
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            title={"Фильтр"}
            className={styles.PollsFilterDialog}
        >
            <div className={styles.PollsFilterDialog__type}>
                <Select
                    options={types}
                    value={state.type}
                    onChange={handleTypeChange}
                    label={"Тип опроса"}
                />
            </div>
            <div className={styles.PollsFilterDialog__date}>
                <p className={styles.PollsFilterDialog__label}>Дата добавления опроса</p>
                <DateField
                    value={state.creationDate}
                    name={"creation-date"}
                    onChange={handleDateChange}
                />
            </div>
        </FilterDialog>
    )
});

PollsFilterDialog.displayName = "PollsFilterDialog";