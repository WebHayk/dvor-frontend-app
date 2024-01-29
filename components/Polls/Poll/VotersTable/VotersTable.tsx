import {FC} from "react";
import Table from "@ui/Table";
import TableHead from "@ui/Table/TableHead";
import TableRow from "@ui/Table/TableRow";
import TableBody from "@ui/Table/TableBody";
import TableCell from "@ui/Table/TableCell";

export const VotersTable: FC = ({children}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell type={"th"}>
                        Дата
                    </TableCell>
                    <TableCell type={"th"}>
                        Кто проголосовал
                    </TableCell>
                    <TableCell type={"th"}>
                        Комментарий
                    </TableCell>
                    <TableCell type={"th"}>
                        Ответ
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}