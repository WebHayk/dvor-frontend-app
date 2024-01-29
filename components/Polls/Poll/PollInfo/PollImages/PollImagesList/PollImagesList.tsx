import {FC, memo} from "react";
import {usePollsSelector} from "@store/selectors";
import ImageComponent from "@ui/FilesUpload/ImagesList/Image";
import {ASSETS_BASE_URL} from "@common/utils/options";

export const PollImagesList: FC = memo(() => {
    
    let state = usePollsSelector();
    let poll = state.polls.poll;
    
    return (
        poll?.images
        ?
        poll.images.length
        ?
        poll.images.map((image: string, index: number) => {

            let imageUrl = ASSETS_BASE_URL + image;

            return (
                <ImageComponent
                    key={index}
                    image={imageUrl}
                    id={index}
                />
            )
        })    
        :
        <p>Пусто</p>
        :
        <p>Пусто</p>
    )
});

PollImagesList.displayName = "PollImagesList";