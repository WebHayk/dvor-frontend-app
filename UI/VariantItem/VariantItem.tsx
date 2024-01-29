import React, {FC, SetStateAction, useEffect, useState} from "react";
import styles from "./VariantItem.module.scss";
import TextField from "@ui/TextField";

interface VariantItem {
    variants: string[],
    setVariants: React.Dispatch<SetStateAction<string[]>>
    variant: string | number,
    onSubmitHandler: (value: string) => void,
    isSubmitted: boolean,
    placeholder: string
}

// `Вариант ответа ${index + 1}`

// result.push(value);

export const VariantItem: FC<VariantItem> = (
    {
        variant,
        setVariants,
        variants,
        isSubmitted,
        placeholder,
        onSubmitHandler
    }
) => {

    let [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    const handleDelete = () => {
        setVariants(variants.filter(element => element !== variant));
    }

    useEffect(() => {
        if (isSubmitted) {
            if (value !== "") {
                onSubmitHandler(value);
            }
        }
    }, [isSubmitted]);

    return (
        <div className={styles.VariantItem}>
            <div className={styles.VariantItem__field}>
                <TextField
                    type={"text"}
                    value={value}
                    name={"variant-value"}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleDelete}>
                <img
                    src={"/images/delete-icon.svg"}
                    alt={"delete-icon"}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}