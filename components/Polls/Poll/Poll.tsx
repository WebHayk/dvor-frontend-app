import {FC, useEffect, Suspense} from "react";
import styles from "./Poll.module.scss";
import {useRouter} from "next/router";
import {GET_POLL_ONE} from "@api/query/query";
import useActions from "@hooks/useActions";
import {usePollsSelector} from "@store/selectors";
import dynamic from "next/dynamic";
import {useQuery} from "@apollo/client";

const PollInfo = dynamic(() => import("./PollInfo"), {
    suspense: true
});
const PollStatistics = dynamic(() => import("./PollStatistics"), {
    suspense: true
});

export const Poll: FC = () => {

    let state = usePollsSelector();
    let router = useRouter();
    let id = router.query.id;

    let {
        setPollOneAction,
        setPollOneUpdateStateAction
    } = useActions();

    let pollQuery = useQuery(GET_POLL_ONE);

    useEffect(() => {
        if (id) {
            pollQuery.refetch({
                id
            })
                .then(response => {
                    setPollOneUpdateStateAction(false);
                    setPollOneAction(response.data.polls_by_pk);
                })
                .catch(err => console.log(err))
        }
    }, [id, state.polls.pollIsUpdate]);

    return (
        <div className={styles.Poll}>
            <Suspense fallback={"Загрузка.."}>
                <PollInfo />
            </Suspense>
            {
                state.polls.poll
                ?
                <Suspense fallback={"Загрузка.."}>
                    <PollStatistics />
                </Suspense>
                :
                null
            }
        </div>
    )
}