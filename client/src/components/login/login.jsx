import React, {useState} from 'react';
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import styles from "./login.module.css"
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <p className={styles.login__header}>Авторизация</p>
            <MyInput value={email} setValue={setEmail} type="text" placeholder="Введите адрес электронной почты..."/>
            <MyInput value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <MyButton onclick={() => dispatch(login(email, password))}>Войти</MyButton>
        </div>
    );
};

export default Login;