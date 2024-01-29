import React, {FC, useState} from "react";
import styles from "./SearchField.module.scss";
import TextField from "@ui/TextField";

interface SearchField {
    setAction: any
}

export const SearchField: FC<SearchField> = (
    {
        setAction
    }
) => {

    let [query, setQuery] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setQuery(value);
    }

    const handleSendQuery = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            if (query !== "") {
                setAction(query);
                setQuery("");
            } else {
                setAction(null);
            }
        }
    }

    return (
        <div className={styles.SearchField}>
            <TextField
                onKeyPress={handleSendQuery}
                type={"text"}
                value={query}
                name={"search-field"}
                placeholder={"Поиск.."}
                onChange={handleChange}
            />
        </div>
    )
}