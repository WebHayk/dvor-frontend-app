import React, {FC, memo} from "react";
import styles from "./Pagination.module.scss";

interface Pagination {
    setPage: React.Dispatch<(prev: number) => number>,
    page: number,
    array: any,
    limit: number,
    className?: any
}

export const Pagination: FC<Pagination> = memo((
    {
        setPage,
        page,
        array,
        limit,
        className
    }
) => {

    const onPrevHandler = () => setPage((prevState: number) => prevState - 1);

    const onNextHandler = () => setPage((prevState: number) => prevState + 1);

    return (
        <div className={className}>
            <div className={styles.Pagination__control}>
                {
                    page !== 0
                    &&
                    <button
                        disabled={!page}
                        onClick={onPrevHandler}
                        className={styles.Pagination__prev}
                    >
                        <img
                            src={"/images/arrow-black-icon.svg"}
                            alt={"arrow-black-icon"}
                            width={24}
                            height={24}
                        />
                    </button>
                }
                {
                    array.length == limit
                    &&
                    <button
                        onClick={onNextHandler}
                        className={styles.Pagination__next}
                    >
                        <img
                            src={"/images/arrow-black-icon.svg"}
                            alt={"arrow-black-icon"}
                            width={24}
                            height={24}
                        />
                    </button>
                }
            </div>
        </div>
    )
});

Pagination.displayName = "Pagination";