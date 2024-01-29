import React, {FC, useState} from "react";
import styles from "./VideoItem.module.scss";
import DropdownButton from "@ui/Dropdown/DropdownButton";
import VideoDropdown from "./VideoDropdown";

interface VideoItem {
    name: string,
    pathToStream: string
}

export const VideoItem: FC<VideoItem> = (
    {
        name,
        pathToStream
    }
) => {

    let [open, setOpen] = useState<boolean>(false);

    return (
            <div className={styles.VideoItem}>
                <div className={styles.VideoItem__content}>
                    <div className={styles.VideoItem__top}>
                        <div className={styles.VideoItem__video}>
                            <iframe
                                allowFullScreen={true}
                                loading={"lazy"}
                                src={pathToStream}
                                width={250}
                                height={170}
                                className={styles.VideoItem__iframe}
                            />
                        </div>
                    </div>
                    <div className={styles.VideoItem__bottom}>
                        <p className={styles.VideoItem__name}>{name}</p>
                        <DropdownButton setOpen={setOpen} open={open}/>
                        {
                            open
                            ?
                            <div className={styles.VideoItem__dropdown}>
                                <VideoDropdown open={open}/>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
    )
}