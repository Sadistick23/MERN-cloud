import React from 'react';
import styles from './MyInpui.module.css'

const MyInput = (props) => {
    return (
        <input
            name={props.name}
            onChange={props.setValue}
            onBlur={props.onBlur}
            value={props.value}
            className={styles.input}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default MyInput;