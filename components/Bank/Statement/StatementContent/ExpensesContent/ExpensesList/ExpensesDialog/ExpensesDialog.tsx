import React, {FC} from "react";
import Dialog from "@ui/Dialog";
import ExpensesDialogHeader from "./ExpensesDialogHeader";
import PaymentItem
    from "@components/Bank/Statement/StatementContent/ExpensesContent/ExpensesList/ExpensesDialog/PaymentItem";
import DateItem from "@ui/DateItem";

interface ExpensesDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    icon: string,
    type: string,
    amount: number
}

export const ExpensesDialog: FC<ExpensesDialog> = (
    {
        setOpen,
        open,
        icon,
        type,
        amount
    }
) => {

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={
                <ExpensesDialogHeader
                    icon={icon}
                    type={type}
                    time={"Расходы за май"}
                    amount={1567890.43}
                />
            }
        >
            <DateItem date={"23.12.2020"} />
            <PaymentItem
                company={"ООО СпецТранс"}
                description={"Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне."}
                amount={1567890.43}
            />
            <PaymentItem
                company={"ООО СпецТранс"}
                description={"Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне."}
                amount={1567890.43}
            />
        </Dialog>
    )
}