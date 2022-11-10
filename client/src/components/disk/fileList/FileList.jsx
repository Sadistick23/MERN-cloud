import React from 'react';
import styles from './FileList.module.css'
import './FileList.css'
import File from "./file/file";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {setCurrentFile, setHeaderDisplay} from "../../../reducers/fileReducer";

const FileList = () => {
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)
    const dispatch = useDispatch()

    if (files.length === 0) {
        return (
            <div className={styles.not_file}><p>В данном раделе нет файлов и папок</p></div>
        )
    }

    if (fileView === 'list') {
        return (
            <div className={styles.file_list} onClick={() => dispatch(setHeaderDisplay('none'))}>
                <div className={styles.helpBar}>
                    <p className={styles.p}>Название</p>
                    <div className={styles.helpBar_right}>
                        <p>Дата</p>
                        <p>Размер</p>
                    </div>
                </div>
                <hr className={styles.hr}/>
                <div>
                    <TransitionGroup>
                        {files.map(file =>
                            <CSSTransition
                                key={file._id}
                                timeout={500}
                                classNames='file'
                                exit={false}
                            >
                                <File file={file} />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
    if (fileView === 'double') {
        return (
            <div className={styles.double}>
                {files.map(file =>
                    <File key={file._id} file={file} />
                )}
            </div>
        )
    }
    if (fileView === 'triple') {
        return (
            <div className={styles.triple}>
                {files.map(file =>
                    <File key={file._id} file={file} />
                )}
            </div>
        )
    }
};

export default FileList;