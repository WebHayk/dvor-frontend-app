import React, {FC, useState} from "react";
import TextField from "@ui/TextField";
import styles from "../../PollsHeader.module.scss";
import useActions from "@hooks/useActions";

export const PollsSearch: FC = () => {

    let {setQueryPollsAction} = useActions();
    let [query, setQuery] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            if (query !== "") {
                setQueryPollsAction(query);
                setQuery("");
            } else {
                setQueryPollsAction("");
            }
        }
    }

    return (
        <div className={styles.PollsSearch}>
            <TextField
                onKeyPress={handleSubmit}
                placeholder={"Поиск по названию"}
                type={"text"}
                value={query}
                name={"query"}
                onChange={handleChange}
            />
        </div>
    )
}