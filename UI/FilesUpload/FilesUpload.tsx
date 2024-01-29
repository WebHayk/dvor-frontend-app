import React, {FC, useEffect, useState} from "react";
import styles from "./FilesUpload.module.scss";
import ImagesList from "./ImagesList";
import {ImagesUploadType, ImageType} from "@typescript/interfaces";
import {FilesUploadContext} from "@context/context";
import FileUpload from "@ui/FileUpload";
import FileRectangleButton from "@ui/Button/FileRectangleButton";
import {IMAGE_ACCEPT} from "@common/utils/options";
import {FilesService} from "@services/filesService";

export const FilesUpload: FC<ImagesUploadType> = (
    {
        files,
        setFiles,
        title,
        imagesList,
        maxLength
    }
) => {

    let [isShow, setShow] = useState<boolean>(true);
    let [images, setImages] = useState<ImageType[]>(imagesList ? imagesList as ImageType[] : []);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (maxLength) {
                if (event.target.files.length <= maxLength) {
                    FilesService.handleFilesUpload(event, files, images, setImages, setFiles);
                }
            } else {
                FilesService.handleFilesUpload(event, files, images, setImages, setFiles);
            }
        }
    }

    useEffect(() => {
        if (maxLength) {
            if (files.length >= maxLength) {
                setShow(false);
            } else {
                setShow(true);
            }
        }
    }, [files, maxLength]);

    return (
        <FilesUploadContext.Provider value={{
            images,
            setImages,
            files,
            setFiles
        }}>
            <div className={styles.FilesUpload}>
                <p className={styles.FilesUpload__title}>{title}</p>
                <div className={styles.FilesUpload__content}>
                    {
                        images.length
                            ?
                            <ImagesList
                                setFiles={setFiles}
                                setImages={setImages}
                                files={files}
                                images={images}
                            />
                            :
                            null
                    }
                    {
                        isShow
                        &&
                        <FileUpload
                            accept={IMAGE_ACCEPT}
                            handleChange={handleChange}
                        >
                            <FileRectangleButton/>
                        </FileUpload>
                    }
                </div>
            </div>
        </FilesUploadContext.Provider>
    )
}