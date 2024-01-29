import {FC} from "react";
import styles from "./VideoObserving.module.scss";
import dynamic from "next/dynamic";

let VideoObservingTop = dynamic(() => import("./VideoObservingTop"), {ssr: false});
let VideoList = dynamic(() => import("./VideoList"), {ssr: false});

export const VideoObservingComponent: FC = () => {
    return (
        <div className={styles.VideoObserving}>
            <VideoObservingTop />
            <VideoList />
        </div>
    )
}