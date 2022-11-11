import React, {useEffect, useState} from 'react';
import styles from "./Disk.module.css"
import './loader.css'
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import arrow from "../../assets/img/arrow.svg"
import double from "../../assets/img/2x2.svg"
import triple from "../../assets/img/3x3.svg"
import list from "../../assets/img/list.svg"
import FileList from "./fileList/FileList";
import MyButton2 from "../MyButton2/MyButton2";
import Popup from "./Popup";
import {setCurrentDir, setCurrentDirName, setHeaderDisplay, setPopupDisplay, setView} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import HeaderButtons from "./fileList/headerButtons/HeaderButtons";
import HeaderPopup from "./fileList/headerButtons/headerPopup/headerPopup";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const currentFile = useSelector(state => state.files.currentFile)
    const dirStack = useSelector(state => state.files.dirStack)
    const dirNameStack = useSelector(state => state.files.dirNameStack)
    const dirName = useSelector(state => state.files.dirName)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function openPopup() {
        dispatch(setPopupDisplay('flex'))
    }
    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
        const backDirName = dirNameStack.pop()
        dispatch(setCurrentDirName(backDirName))
        dispatch(setHeaderDisplay('none'))
    }
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        setDragEnter(false)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    if (loader) {
        return (
            <div className={styles.loader}>
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
            <div className={styles.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <p className={styles.title}>{dirName ? dirName : 'MERN'}</p>
                <div className={styles.disk__btns} onClick={() => dispatch(setHeaderDisplay('none'))}>
                    <div className={styles.btns}>
                        <MyButton2 onClick={backClickHandler}><img src={arrow} alt=""/></MyButton2>
                        <div className={styles.right__btns}>
                            <div className={styles.right_btn}>
                                <select value={sort} onChange={(e) => setSort(e.target.value)} className={styles.select}>
                                    <option value="name">По имени</option>
                                    <option value="type">По типу</option>
                                    <option value="date">По дате</option>
                                </select>
                            </div>
                            <div className={styles.right_btn} onClick={() => dispatch(setView('double'))}><img src={double} alt=""/></div>
                            <div className={styles.right_btn} onClick={() => dispatch(setView('triple'))}><img src={triple} alt=""/></div>
                            <div className={styles.right_btn} onClick={() => dispatch(setView('list'))}><img src={list} alt=""/></div>
                        </div>
                    </div>
                </div>
                <div className={styles.create__btn}>
                    <div className={styles.create_dir}><MyButton2 onClick={openPopup}>Создать папку</MyButton2></div>
                    <div className={styles.upload_file}>
                        <label htmlFor="upload_input" className={styles.upload_label}>Загрузить файл</label>
                        <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="upload_input" className={styles.upload_input}/>
                    </div>
                </div>
                <FileList />
                <Popup />
                <HeaderPopup />
                <Uploader />
                <HeaderButtons />
            </div>
            :
            <div className={styles.drop_area} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файл сюда
            </div>
    );
};

export default Disk;