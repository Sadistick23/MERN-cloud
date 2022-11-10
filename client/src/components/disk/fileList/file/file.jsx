import React, {useEffect, useState} from 'react';
import styles from './file.module.css'
import folder from '../../../../assets/img/folder.svg'
import fileIcon from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    pushToDirNameStack,
    pushToStack, setCheckedFile,
    setCurrentDir,
    setCurrentDirName, setCurrentFile,
    setHeaderDisplay
} from "../../../../reducers/fileReducer";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const currentDirName = useSelector(state => state.files.dirName)
    const fileView = useSelector(state => state.files.view)

    function openDir() {
        if (file.type === 'dir') {
            openDirHandler()
        }
    }
    function openDirHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(pushToDirNameStack(currentDirName))
        dispatch(setCurrentDirName(file.fileName))
        dispatch(setCurrentDir(file._id))
        dispatch(setHeaderDisplay('none'))
    }
    function giveCurrentFile(e) {
        e.stopPropagation()
        dispatch(setHeaderDisplay('flex'))
        dispatch(setCurrentFile({file}))
    }

    if (fileView === 'list') {
        return (
            <div className={styles.file} onDoubleClick={openDir} onClick={(e) => giveCurrentFile(e)}>
                <img src={file.type === 'dir' ? folder : fileIcon} alt="" className={styles.file_img}/>
                <div className={styles.file_name}>{file.fileName}</div>
                <div className={styles.file_date}>{file.date.slice(0, 10)}</div>
                <div className={styles.file_size}>{sizeFormat(file.size)}</div>
            </div>
        );
    }
    if (fileView === 'double') {
        return (
            <div className={styles.double} onDoubleClick={openDir} onClick={(e) => giveCurrentFile(e)}>
                <img src={file.type === 'dir' ? folder : fileIcon} alt="" className={styles.double_file_img}/>
                <div className={styles.double_file_name}>{file.fileName.substring(0,20)}</div>
            </div>
        )
    }
    if (fileView === 'triple') {
        return (
            <div className={styles.triple} onDoubleClick={openDir} onClick={(e) => giveCurrentFile(e)}>
                <img src={file.type === 'dir' ? folder : fileIcon} alt="" className={styles.triple_file_img}/>
                <div className={styles.triple_file_name}>{file.fileName.substring(0,35)}</div>
            </div>
        )
    }
};

export default File;