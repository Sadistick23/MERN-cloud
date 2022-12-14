import React from 'react';
import styles from './MyButton.module.css'

const MyButton = (props) => {
    return (
        <button
            style={{marginLeft: props.marginLeft}}
            onClick={props.onclick}
            className={styles.btn}
        >
            {props.children}
        </button>
    );
};

export default MyButton;