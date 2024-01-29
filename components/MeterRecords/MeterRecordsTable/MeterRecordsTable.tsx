import {FC} from "react";
import Table from "@ui/Table";
import TableHead from "@ui/Table/TableHead";
import TableCell from "@ui/Table/TableCell";
import TableRow from "@ui/Table/TableRow";
import TableBody from "@ui/Table/TableBody";

export const MeterRecordsTable: FC = ({children}) => {
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
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}