import {FC, useEffect, useState} from "react";
import {apiService} from "@services/apiService";
import {GET_METER_TYPES} from "@api/query/query";
import {KeyType} from "@typescript/interfaces";
import Button from "@ui/Button";
import HistoryFilterDialog from "./HistoryFilterDialog";

export const HistoryControl: FC = () => {

    let [open, setOpen] = useState<boolean>(false);
    let [types, setTypes] = useState<KeyType[]>([]);

    useEffect(() => {
        apiService.queryRequest(GET_METER_TYPES)
            .then(response => {
                let data = response.data.meter_types;
                setTypes(data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleFilterDialogShow = () => setOpen(true);

    return (
        <>
            <Button
                type={"button"}
                onClick={handleFilterDialogShow}
                color={"white"}
                label={"Фильтр"}
            />
            <HistoryFilterDialog
                open={open}
                setOpen={setOpen}
                types={types}
            />
        </>
    )
}