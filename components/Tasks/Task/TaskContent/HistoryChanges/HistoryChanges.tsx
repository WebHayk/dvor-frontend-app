import {FC, memo, useEffect} from "react";
import PanelHeader from "@ui/PanelHeader";
import {GET_TASK_LOGS} from "@api/query/query";
import {useTasksSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import HistoryChangesList from "./HistoryChangesList";
import {useQuery} from "@apollo/client";

export const HistoryChanges: FC = memo(() => {

    let state = useTasksSelector();
    let {setTaskLogsAction} = useActions();
    let id = state.task.data?.id;

    let taskLogs = useQuery(GET_TASK_LOGS, {
        variables: {
            id
        }
    });

    useEffect(() => {
        taskLogs.refetch()
          .then(response => {
              let data = response.data.task_logs;
              setTaskLogsAction(data);
          })
          .catch(err => console.log(err))
    }, [taskLogs]);

    return (
        <>
            <PanelHeader
                icon={"/images/history-editions-white-icon.svg"}
                title={"История изменений"}
            />
            <HistoryChangesList />
        </>
    )
});

HistoryChanges.displayName = "HistoryChanges";