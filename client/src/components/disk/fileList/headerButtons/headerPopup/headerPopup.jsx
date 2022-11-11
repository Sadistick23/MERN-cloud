import React, {useState} from 'react';
import styles from './headerPopup.module.css'
import {setHeaderPopupDisplay, setPopupDisplay} from "../../../../../reducers/fileReducer";
import {renameDir} from "../../../../../actions/file";
import MyInput from "../../../../MyInput/MyInput";
import MyButton from "../../../../MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";

const HeaderPopup = () => {
    const currentFile = useSelector(state => state.files.currentFile)
    const [value, setValue] = useState('')
    const headerPopupDisplay = useSelector(state => state.files.headerPopupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function renameHandler() {
        dispatch(renameDir(currentDir, currentFile.fileName, value, currentFile.type))
        dispatch(setHeaderPopupDisplay('none'))
        setValue('')
    }
    const renameValueHandler = (e) => {
        setValue(e.target.value)
    }
    return (
        <div className={styles.popup} style={{display: headerPopupDisplay}} onClick={() => dispatch(setHeaderPopupDisplay('none'))}>
            <div className={styles.popup__content} onClick={event => event.stopPropagation()}>
                <div className={styles.popup__header}>
                    <div className={styles.popup__title}><div style={{paddingRight: "10px"}}>Текущее имя папки:</div><div style={{color: "green"}}>{`${currentFile.fileName}`}</div></div>
                    <button onClick={() => dispatch(setHeaderPopupDisplay('none'))} className={styles.popup__close}>X</button>
                </div>
                <MyInput name="folder" value={value} setValue={(e) => renameValueHandler(e)} type="text" placeholder="Новое название папки..."/>
                <MyButton onclick={() => renameHandler()}>Переименовать</MyButton>
            </div>
        </div>
    );
};

export default HeaderPopup;