import React, {useEffect, useState} from 'react';
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import styles from "./login.module.css"
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [emailError, setEmailError] = useState('Почта не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Неконкретный email')
            if (!e.target.value) {
                setEmailError('Почта не может быть пустым')
            }
        } else {
            setEmailError('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6 || e.target.value.length > 16) {
            setPasswordError('Пароль должен быть длинее 6 и не менее 16 символов')
            if (!e.target.value) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }


    return (
        <div className={styles.container}>
            <p className={styles.login__header}>Авторизация</p>
            <MyInput onBlur={e => blurHandler(e)} name='email' value={email} setValue={(e) => emailHandler(e)} type="text" placeholder="Введите адрес электронной почты..."/>
            <div className={styles.padding}>{(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}</div>
            <MyInput onBlur={e => blurHandler(e)} name='password' value={password} setValue={(e) => passwordHandler(e)} type="password" placeholder="Введите пароль..."/>
            <div className={styles.padding}>{(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}</div>
            <MyButton disabled={!formValid} onclick={() => dispatch(login(email, password))}>Войти</MyButton>
        </div>
    );
};

export default Login;