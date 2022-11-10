import React, {useState} from 'react';
import styles from './Navbar.module.css'
import Logo from '../../assets/img/navbar-logo.svg'
import avatarLogo from '../../assets/img/defaultAvatar.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFile} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import {API_URL} from "../../utils/config";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to={"/disk"} className={styles.logo}>
                    <img src={Logo} alt="" className={styles.navbar__logo}/>
                    <div className={styles.navbar__header}><p>MERN ХРАНИЛИЩЕ</p></div>
                </NavLink>
                {!isAuth &&
                    <div className={styles.navbar__auth}>
                        <NavLink to={"/login"}><p className={styles.navbar__login}>Войти</p></NavLink>
                        <NavLink to={"/registration"}><p className={styles.navbar__registration}>Регистрация</p></NavLink>
                    </div>
                }
                {isAuth &&
                    <div className={styles.right_bar}>
                        <input
                            onChange={(e) => searchChangeHandler(e)}
                            value={searchName}
                            className={styles.search_bar}
                            type="text"
                            placeholder="Название файла..."
                        />
                        <NavLink to='/profile'><img className={styles.avatar} src={avatar} alt=""/></NavLink>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;