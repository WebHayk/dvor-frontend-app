import {FC, memo} from "react";
import HistoryChangesTable from "../HistoryChangesTable";
import {useTasksSelector} from "@store/selectors";
import {TaskLogType} from "@typescript/interfaces";
import HistoryChangesRow from "../HistoryChangesTable/HistoryChangesRow";

export const HistoryChangesList: FC = memo(() => {

    let state = useTasksSelector();
    let taskLogs = state.task.logs;

    return (
        <HistoryChangesTable>
            {
                taskLogs.length
                ?
                taskLogs.map((log: TaskLogType) => {

                    let {event_message, created_at, id} = log;

                    return (
                        event_message
                        &&
                        <HistoryChangesRow
                            key={id}
                            date={created_at}
                            status={event_message}
                        />
                    )
                })
                :
                null
            }
        </HistoryChangesTable>
    )
});

HistoryChangesList.displayName = "HistoryChangesList";