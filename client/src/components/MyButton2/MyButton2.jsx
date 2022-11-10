import React from 'react';
import styles from './MyButton2.module.css'

const MyButton2 = (props) => {
    return (
        <button
            className={styles.button}
            onClick={() => props.onClick()}
        >
            {props.children}
        </button>
    );
};

export default MyButton2;