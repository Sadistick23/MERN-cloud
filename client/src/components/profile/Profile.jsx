import React, {useEffect} from 'react';
import styles from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import avatarLogo from "../../assets/img/defaultAvatar.svg";
import {deleteAvatar, logout, uploadAvatar} from "../../actions/user";
import sizeFormat from "../../utils/sizeFormat";
import {API_URL} from "../../utils/config";

const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const diskSpace = useSelector(state => state.user.diskSpace)
    const usedSpace = useSelector(state => state.user.usedSpace)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const dispatch = useDispatch()

    useEffect(() => {

    }, [usedSpace])

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={styles.profile}>
            <div className={styles.wrap}>
                <div className={styles.avatar}>
                    <img src={avatar} alt=""/>
                    <div className={styles.avatar_btn}>
                        <input accept="image/*" type="file" onChange={(e) => changeHandler(e)} placeholder="Загрузить аватар"/>
                        <button className={styles.btn} onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
                    </div>
                </div>
                <div>
                    <p className={styles.user_info}>Имя: {currentUser.name}</p>
                    <p className={styles.user_info}>Фамилия: {currentUser.lastName}</p>
                    <p className={styles.user_info}>Почта: {currentUser.email}</p>
                    <p className={styles.user_info}>{sizeFormat(usedSpace)} из {sizeFormat(diskSpace)}</p>
                    <p className={styles.navbar__logout} onClick={() => dispatch(logout())}>Выйти из учетной записи</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;