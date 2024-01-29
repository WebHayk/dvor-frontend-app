import {FC, memo, useEffect} from "react";
import styles from "./Polls.module.scss";
import PollsHeader from "./PollsHeader";
import PollsTab from "./PollsTab";
import PollsFilters from "./PollsHeader/PollsFilters";
import useActions from "@hooks/useActions";

export const Polls: FC = memo(() => {

    let {
        setTypePollsAction,
        setCreationDatePollsAction
    } = useActions();

    useEffect(() => {
        setTypePollsAction(null);
        setCreationDatePollsAction(null);
    }, [])

    return (
        <div className={styles.Polls}>
            <PollsHeader />
            <PollsFilters />
            <PollsTab />
        </div>
    )
});

Polls.displayName = "Polls";