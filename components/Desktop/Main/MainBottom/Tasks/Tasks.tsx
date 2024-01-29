import {FC} from "react";
import TasksTop from "./TasksTop";
import TasksContent from "@ui/Tasks/TasksContent";
import {useDesktopSelector, useMainSelector} from "@store/selectors";
import useActions from "@hooks/useActions";

export const Tasks: FC = () => {

    let desktopState = useDesktopSelector();
    let mainState = useMainSelector();
    let {
        setDesktopTasksAction,
        setDesktopMyTasksAction
    } = useActions();

    const props = {
        myTasks: {
            data: desktopState.myTasks,
            ownerId: mainState.profile?.id,
            paginationAction: setDesktopMyTasksAction
        },
        tasks: {
            data: desktopState.tasks,
            ownerId: null,
            paginationAction: setDesktopTasksAction
        }
    };

    return (
        <>
            <TasksTop />
            <TasksContent
                urgently={null}
                created_at={null}
                status_key={null}
                pattern={null}
                myTasks={props.myTasks}
                tasks={props.tasks}
                control={false}
            />
        </>
    )
}