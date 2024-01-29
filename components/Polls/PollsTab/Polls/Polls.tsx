import {FC, memo, useEffect} from "react";
import {useMainSelector, usePollsSelector} from "@store/selectors";
import {useQuery} from "@apollo/client";
import {GET_POLLS} from "@api/query/query";
import styles from "@components/Polls/Polls.module.scss";
import PollsList from "@ui/Polls/PollsList";
import {PollType} from "@typescript/interfaces";

interface Polls {
    is_finished: boolean,
    setPollsAction: any,
    array: PollType[]
}

export const Polls: FC<Polls> = memo((
    {
        is_finished,
        setPollsAction,
        array
    }
) => {

    let pollsState = usePollsSelector();
    let mainState = useMainSelector();

    let pollsQuery = useQuery(GET_POLLS, {
        variables: {
            question_type_key: pollsState.filters.type,
            created_at: pollsState.filters.creationDate,
            is_finished
        }
    });

    useEffect(() => {
        pollsQuery.refetch()
            .then(response => {
                let data = response.data.polls;
                setPollsAction(data);
            })
            .catch(err => console.log(err))
    }, [pollsState.filters.type, pollsState.filters.creationDate, mainState.user?.apartment_user, pollsState.isUpdate]);

    return (
        array.length
        ?
        <div className={styles.Polls__wrapper}>
            <PollsList
                array={array}
            />
        </div>
        :
        null
    )
});

Polls.displayName = "Polls";