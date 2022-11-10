import React from 'react';
import styles from './HeaderButtons.module.css'
import file from '../../../../assets/img/file.svg'
import info from '../../../../assets/img/info1.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    pushToDirNameStack,
    pushToStack,
    setCurrentDir,
    setCurrentDirName,
    setHeaderDisplay, setInfoDisplay
} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import InfoDisplay from "../infoDisplay/infoDisplay";

const HeaderButtons = () => {
    const dispatch = useDispatch()
    const headerDisplay = useSelector(state => state.files.headerDisplay)
    const currentFile = useSelector(state => state.files.currentFile)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentDirName = useSelector(state => state.files.dirName)
    const infoDisplay = useSelector(state => state.files.infoDisplay)

    function openDir() {
        if (currentFile.type === 'dir') {
            openDirHandler()
        }
    }
    function openDirHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(pushToDirNameStack(currentDirName))
        dispatch(setCurrentDirName(currentFile.fileName))
        dispatch(setCurrentDir(currentFile._id))
        dispatch(setHeaderDisplay('none'))
        dispatch(setInfoDisplay("none"))
    }
    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(currentFile)
    }
    function openInfoHandler(e) {
        e.stopPropagation()
        if (infoDisplay === 'flex') {
            dispatch(setInfoDisplay("none"))
        } else {
            dispatch(setInfoDisplay("flex"))
        }
    }
    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(currentFile))
        dispatch(setHeaderDisplay('none'))
        dispatch(setInfoDisplay("none"))
    }
    return (
        <div className={styles.header} style={{display: headerDisplay}}>
            <div className={styles.left_bar}>
                <img className={styles.info}
                     onClick={(e) => openInfoHandler(e)}
                     src={info} alt=""
                />
                <div className={styles.logo}><img src={file} alt=""/></div>
                <div className={styles.file_name}>{currentFile.fileName}</div>
                {currentFile.type === 'dir' ? <button className={styles.btn} onClick={openDir}>Открыть</button> : <div></div>}
            </div>
            <div className={styles.right_bar}>
                <button className={styles.btn} onClick={(e) => downloadClickHandler(e)}>Скачать</button>
                <button className={styles.btn} onClick={(e) => deleteClickHandler(e)}>Удалить</button>
                <button className={styles.btn} onClick={() => dispatch(setHeaderDisplay('none'))}>X</button>
            </div>
            <InfoDisplay file={currentFile}/>
        </div>
    );
};

export default HeaderButtons;