import React from 'react';
import styles from './infoDisplay.module.css'
import sizeFormat from "../../../../utils/sizeFormat";
import {useSelector} from "react-redux";

const InfoDisplay = ({file}) => {
    const infoDisplay = useSelector(state => state.files.infoDisplay)

    return (
        <div className={styles.info_display} style={{display: infoDisplay}}>
            <div className={styles.info}>
                Дата создания: {file.date === undefined ? file.date : file.date.slice(0,10) }<br/>
                Размер: {sizeFormat(file.size)}
            </div>
        </div>
    );
};

export default InfoDisplay;