import React from 'react';
import styles from './Uploader.module.css'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";

const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.upload_file}>
            <div className={styles.upload_file__header}>
                <div className={styles.upload_file__name}>{file.name.slice(0,25)}</div>
                <button className={styles.upload_file__remove} onClick={() => dispatch(removeUploadFile(file.id))}>X</button>
            </div>
            <div className={styles.upload_file__progress_bar}>
                <div className={styles.upload_file__upload_bar} style={{width: file.progress + '%'}}/>
                <div className={styles.upload_file__percent}>{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;