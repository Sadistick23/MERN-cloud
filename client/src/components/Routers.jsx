import React from 'react';
import styles from "./App.module.css"
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from '../Router/Route'
import {useSelector} from "react-redux";

const Routers = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        isAuth
            ?
            <div className={styles.content}>
                <div className={styles.container}>
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route
                                key={route.id}
                                path={route.path}
                                element={<route.element/>}
                            />
                        )}
                        <Route path="*" element={<Navigate to="/disk"/>}/>
                    </Routes>
                </div>
            </div>
            :
            <div className={styles.wrap}>
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.id}
                            path={route.path}
                            element={<route.element/>}
                        />
                    )}
                    <Route path="*"  element={<Navigate to="/login"/>}/>
                </Routes>
            </div>

    );
};

export default Routers;