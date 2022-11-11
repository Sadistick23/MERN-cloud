import React, {useEffect, useState} from 'react';
import style from './registration.module.css'
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import {registration} from "../../actions/user";
import {useDispatch} from "react-redux";

const Registration = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameDirty, setNameDirty] = useState(false)
    const [lastNameDirty, setLastNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [lastNameError, setLastNameError] = useState('Фамилия не может быть пустым')
    const [emailError, setEmailError] = useState('Почта не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (nameError || lastNameError || emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, nameError, lastNameError])

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 3) {
            setNameError('Имя должно быть не меньше 3 букв')
            if (!e.target.value) {
                setNameError('Имя не может быть пустым')
            }
        } else {
            setNameError('')
        }
    }
    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        if (e.target.value.length < 4) {
            setLastNameError('Фамилия должна быть не меньше 4 букв')
            if (!e.target.value) {
                setLastNameError('Фамилия не может быть пустым')
            }
        } else {
            setLastNameError('')
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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'lastName':
                setLastNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }
    const regHandler = (e) => {
        e.preventDefault()
        dispatch(registration(name, lastName, email, password))
    }

    return (
        <form className={style.registration}>
            <p className={style.registration__header}>Регистрация</p>
            <MyInput onBlur={e => blurHandler(e)} value={name} setValue={(e) => nameHandler(e)} name='name' type="text" placeholder="Введите имя..."/>
            <div className={style.padding}>{(nameDirty && nameError) && <div style={{color: "red"}}>{nameError}</div>}</div>
            <MyInput onBlur={e => blurHandler(e)} value={lastName} setValue={(e) => lastNameHandler(e)} name='lastName' type="text" placeholder="Введите фамилию..."/>
            <div className={style.padding}>{(lastNameDirty && lastNameError) && <div style={{color: "red"}}>{lastNameError}</div>}</div>
            <MyInput onBlur={e => blurHandler(e)} value={email} setValue={(e) => emailHandler(e)} name='email' type="text" placeholder="Введите адрес электронной почты..."/>
            <div className={style.padding}>{(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}</div>
            <MyInput onBlur={e => blurHandler(e)} value={password} setValue={(e) => passwordHandler(e)} name='password' type="password" placeholder="Введите пароль..."/>
            <div className={style.padding}>{(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}</div>
            <MyButton disabled={!formValid} onclick={(e) => regHandler(e)}>Зарегестрироваться</MyButton>
        </form>
    );
};

export default Registration;