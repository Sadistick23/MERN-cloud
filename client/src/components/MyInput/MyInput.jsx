import React from 'react';
import styles from './MyInpui.module.css'

const MyInput = (props) => {
    return (
        <input
            onChange={(e) => props.setValue(e.target.value)}
            value={props.value}
            className={styles.input}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default MyInput;