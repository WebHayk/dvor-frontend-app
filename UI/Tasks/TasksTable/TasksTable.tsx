import {FC} from "react";
import Table from "@ui/Table";
import TableHead from "@ui/Table/TableHead";
import TableRow from "@ui/Table/TableRow";
import TableCell from "@ui/Table/TableCell";
import TableBody from "@ui/Table/TableBody";

interface TasksTable {
    control: boolean
}

export const TasksTable: FC<TasksTable> = (
    {
        children,
        control
    }
) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell type={"th"}>
                        Номер
                    </TableCell>
                    <TableCell type={"th"}>
                        Задача, теги
                    </TableCell>
                    <TableCell type={"th"}>
                        Статус
                    </TableCell>
                    {
                        control
                        ?
                        <TableCell type={"th"}>
                            Адрес квартиры
                        </TableCell>
                        :
                        null
                    }
                    <TableCell align={"right"} type={"th"}>
                        Дата подачи заявки
                    </TableCell>
                    {
                        control
                        ?
                        <TableCell type={"th"}> </TableCell>
                        :
                        null
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}