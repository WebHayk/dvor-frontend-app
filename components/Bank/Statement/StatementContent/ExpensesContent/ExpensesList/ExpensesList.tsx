import {FC} from "react";
import ExpensesItem from "./ExpensesItem";

export const ExpensesList: FC = () => {
    return (
        <>
            <ExpensesItem
                icon={"/images/bank-electricity-day-icon.svg"}
                type={"Электропотребление - день"}
                amount={35567.09}
            />
            <ExpensesItem
                icon={"/images/bank-heating-icon.svg"}
                type={"Отопление"}
                amount={35567.09}
            />
            <ExpensesItem
                icon={"/images/apartment-content-icon.svg"}
                type={"Содержание жилья"}
                amount={35567.09}
            />
            <ExpensesItem
                icon={"/images/bank-water-icon.svg"}
                type={"Вода"}
                amount={35567.09}
            />
            <ExpensesItem
                icon={"/images/trash-removeing-icon.svg"}
                type={"Вывоз мусора"}
                amount={35567.09}
            />
            <ExpensesItem
                icon={"/images/elevators-icon.svg"}
                type={"Лифты"}
                amount={35567.09}
            />
        </>
    )
}