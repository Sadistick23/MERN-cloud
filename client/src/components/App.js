import React, {useEffect} from "react";
import Navbar from "./navbar/Navbar";
import styles from './App.module.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Routers from "./Routers";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../reducers/userReducer";
import {setView} from "../reducers/fileReducer";
import {refresh} from "../actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(refresh())
            dispatch(setView(localStorage.getItem('view')))
        }
    }, [])

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Navbar />
                <Routers />
            </div>
        </BrowserRouter>
    );
}

export default App;
