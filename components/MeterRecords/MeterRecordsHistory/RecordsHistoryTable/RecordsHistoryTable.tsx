import {FC, ReactNode} from "react";
import TableHead from "@ui/Table/TableHead";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import Table from "@ui/Table";

interface RecordsHistoryTable {
    children: ReactNode
}

export const RecordsHistoryTable: FC<RecordsHistoryTable> = (
    {
        children
    }
) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell type={"th"}>
                        Счетчик, номер
                    </TableCell>
                    <TableCell type={"th"}>
                        Показания
                    </TableCell>
                    <TableCell type={"th"}>
                        Расход за месяц
                    </TableCell>
                    <TableCell type={"th"}>
                        Примечание
                    </TableCell>
                    <TableCell type={"th"}> </TableCell>
                </TableRow>
            </TableHead>
            {children}
        </Table>
    )
}