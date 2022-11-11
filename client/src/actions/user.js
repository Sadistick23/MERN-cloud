import axios from "axios"
import {checkAuth, logOut, setAvatar, setDiskSpace, setUsedSpace, setUser} from "../reducers/userReducer";
import {API_URL} from "../utils/config";

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error;
})
export const registration = (name, lastName, email, password) => {
    return async dispatch => {
        try {
            const response = await api.post(`/api/auth/registration`, {name, lastName, email, password})
            if (response.status === 200) {
                window.location.replace('/login')
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await api.post(`/api/auth/login`, {email, password}, { withCredentials: true })
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const refresh = () => {
    return async dispatch => {
        try {
            const response = await api.get(`/api/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            dispatch(checkAuth(response.data.user))
            dispatch(setDiskSpace(response.data.user.diskSpace))
            dispatch(setUsedSpace(response.data.user.usedSpace))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const logout = () => {
    return async dispatch => {
        try {
            const response = await api.post(`/api/auth/logout`)
            dispatch(logOut(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await api.post(`${API_URL}/avatar`, formData)
            console.log(response.data)
            dispatch(setAvatar(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await api.delete(`${API_URL}/avatar`)
            console.log(response.data)
            dispatch(setAvatar(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}