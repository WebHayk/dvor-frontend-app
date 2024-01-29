import React, {FC, ReactNode} from "react";
import Dialog from "@ui/Dialog";
import DialogFooter from "@ui/Dialog/DialogFooter";

interface WarningDialog {
    open: boolean,
    setOpen: React.Dispatch<boolean>,
    children: ReactNode,
    setIsSubmitted: React.Dispatch<boolean>
}

export const WarningDialog: FC<WarningDialog> = (
    {
        open,
        setOpen,
        children,
        setIsSubmitted
    }
) => {

    const handleClose = () => setOpen(false);
    const handleSubmit = () => setIsSubmitted(true);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Подтверждение действия"}
        >
            {children}
            <DialogFooter
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                submitAction={"Подтвердить"}
            />
        </Dialog>
    )
}