import {FC, memo} from "react";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import {dateFormatterHelper, dateToTimeHelper} from "@common/utils/helpers";

interface HistoryChangesRow {
    date: string,
    status: string
}

export const HistoryChangesRow: FC<HistoryChangesRow> = memo((
    {
        date,
        status
    }
) => {

    let creationTime = dateToTimeHelper(date);
    let creationDate = dateFormatterHelper(date);

    return (
        <TableRow>
            <TableCell type={"td"}>
                {creationDate} {creationTime}
            </TableCell>
            <TableCell type={"td"}>
                {status}
            </TableCell>
        </TableRow>
    )
});

HistoryChangesRow.displayName = "HistoryChangesRow";