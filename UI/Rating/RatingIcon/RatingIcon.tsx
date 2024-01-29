import {FC} from "react";

interface RatingIcon {
    activeColor: string | null,
    offset: number,
    id: string,
    width: number,
    height: number
}

export const RatingIcon: FC<RatingIcon> = (
    {
        activeColor,
        offset,
        id,
        width,
        height
    }
) => {
    return (
        <svg width={width} height={height} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={id} x1="0" y1="1" x2="1" y2="1">
                    <stop id="stop1" offset={`${offset}%`} stopColor={activeColor || "#C4C4C4"} />
                    <stop id="stop2" offset="0%" stopColor="#C4C4C4"/>
                </linearGradient>
            </defs>

            <path fillRule="evenodd" clipRule="evenodd"
                  d="M2 0C0.895431 0 0 0.89543 0 2V15C0 16.1046 0.89543 17 2 17H15C16.1046 17 17 16.1046 17 15V2C17 0.895431 16.1046 0 15 0H2ZM10.3335 6.21381L13.6251 6.69219C13.852 6.72589 14.0101 6.93591 13.9751 7.16278C13.9622 7.25353 13.9194 7.3365 13.8546 7.40003L11.4731 9.7219L12.0357 13.0005C12.0746 13.2261 11.9229 13.44 11.6974 13.4789C11.6079 13.4945 11.5146 13.4802 11.4342 13.4374L8.49003 11.8895L5.54587 13.4374C5.47743 13.4736 5.40023 13.4898 5.32302 13.4843C5.24582 13.4788 5.1717 13.4518 5.10907 13.4063C5.04645 13.3608 4.99782 13.2987 4.9687 13.227C4.93958 13.1552 4.93114 13.0768 4.94434 13.0005L5.50698 9.7219L3.12547 7.40003C3.04661 7.32316 3.0015 7.21812 3.00004 7.108C2.99858 6.99788 3.0409 6.89169 3.11769 6.81275C3.18122 6.74793 3.26419 6.70515 3.35494 6.69219L6.64653 6.21381L8.11796 3.23077C8.22037 3.02593 8.46928 2.94167 8.67412 3.04279C8.75579 3.08298 8.82191 3.14909 8.8621 3.23077L10.3335 6.21381Z"
                  fill={`url(#${id})`}/>
        </svg>
    )
}