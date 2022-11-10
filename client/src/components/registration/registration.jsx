import React, {useState} from 'react';
import style from './registration.module.css'
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import {registration} from "../../actions/user";

const Registration = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className={style.registration}>
            <p className={style.registration__header}>Регистрация</p>
            <MyInput value={name} setValue={setName} type="text" placeholder="Введите имя..."/>
            <MyInput value={lastName} setValue={setLastName} type="text" placeholder="Введите фамилию..."/>
            <MyInput value={email} setValue={setEmail} type="text" placeholder="Введите адрес электронной почты..."/>
            <MyInput value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <MyButton onclick={() => registration(name, lastName, email, password)}>Зарегестрироваться</MyButton>
        </div>
    );
};

export default Registration;