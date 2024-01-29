import {Dispatch, FC} from "react";
import styles from "../../Documents.module.scss";
import Dialog from "@ui/Dialog";
import DocViewer, {
    BMPRenderer,
    ImageProxyRenderer,
    JPGRenderer,
    MSDocRenderer,
    MSGRenderer,
    PDFRenderer,
    PNGRenderer,
    TIFFRenderer,
    TXTRenderer
} from "@cyntler/react-doc-viewer";

interface ShowDocumentDialog {
    open: boolean,
    setOpen: Dispatch<boolean>,
    path: string
}

export const ShowDocumentDialog: FC<ShowDocumentDialog> = (
    {
        open,
        setOpen,
        path
    }
) => {

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            handleClose={handleClose}
            open={open}
            title={"Просмотр документа"}
        >
            <DocViewer
                className={styles.ShowDocumentDialog__viewer}
                config={{
                    header: {
                        disableHeader: true,
                        disableFileName: true
                    }
                }}
                pluginRenderers={[
                    PDFRenderer,
                    TXTRenderer,
                    BMPRenderer,
                    ImageProxyRenderer,
                    JPGRenderer,
                    MSDocRenderer,
                    MSGRenderer,
                    PNGRenderer,
                    TIFFRenderer
                ]}
                documents={[{uri: `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}docs/${path}`}]}
            />
        </Dialog>
    )
}