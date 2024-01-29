import {FC, memo} from "react";
import styles from "./TaskTags.module.scss";
import {TaskTagType} from "@typescript/interfaces";
import Chip from "@ui/Chip";

interface TaskTags {
    tags: TaskTagType[]
}

export const TaskTags: FC<TaskTags> = memo((
    {
        tags
    }
) => {
    return (
        <div className={styles.TaskTags}>
            {
                tags.map(tag => {
                    return (
                        <Chip
                            className={styles.TaskTags__item}
                            key={tag.tag.name + tag.tag.id}
                            label={tag.tag.name}
                            active={true}
                        />
                    )
                })
            }
        </div>
    )
});

TaskTags.displayName = "TaskTags";