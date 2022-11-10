import React, {useState} from 'react';
import styles from './Popup.module.css'
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";

const Popup = () => {
    const [value, setValue] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createDirHandler() {
        dispatch(createDir(currentDir, value))
        dispatch(setPopupDisplay('none'))
        setValue('')
    }

    return (
        <div className={styles.popup} style={{display: popupDisplay}} onClick={() => dispatch(setPopupDisplay('none'))}>
            <div className={styles.popup__content} onClick={event => event.stopPropagation()}>
                <div className={styles.popup__header}>
                    <p className={styles.popup__title}>Создать новую папку</p>
                    <button onClick={() => dispatch(setPopupDisplay('none'))} className={styles.popup__close}>X</button>
                </div>
                <MyInput value={value} setValue={setValue} type="text" placeholder="Введите название папки..."/>
                <MyButton onclick={() => createDirHandler()}>Создать</MyButton>
            </div>
        </div>
    );
};

export default Popup;