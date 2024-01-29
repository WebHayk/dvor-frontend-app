import {FC} from "react";
import Table from "@ui/Table";
import TableHead from "@ui/Table/TableHead";
import TableCell from "@ui/Table/TableCell";
import TableBody from "@ui/Table/TableBody";
import TableRow from "@ui/Table/TableRow";

export const HistoryChangesTable: FC = ({children}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell type={"th"}>
                        Дата
                    </TableCell>
                    <TableCell type={"th"}>
                        Статус
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}