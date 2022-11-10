const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const CHECK_AUTH = "CHECK_AUTH"
const SET_AVATAR = "SET_AVATAR"
const SET_DISK_SPACE = "SET_DISK_SPACE"
const SET_USED_SPACE = "SET_USED_SPACE"

const defaultState = {
    currentUser: {},
    diskSpace: 0,
    usedSpace: 0,
    isAuth: false,
    avatar: {}
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem('token', action.payload.accessToken)
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case CHECK_AUTH:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        case SET_DISK_SPACE:
            return {
                ...state,
                diskSpace: action.payload
            }
        case SET_USED_SPACE:
            return {
                ...state,
                usedSpace: action.payload
            }
        default:
            return state
    }
}

export const setUser = (user, token) => ({type: SET_USER, payload: user, token})
export const logOut = (leave) => ({type: LOGOUT, payload: leave})
export const checkAuth = (payload) => ({type: CHECK_AUTH, payload})
export const setAvatar = (avatar) => ({type: SET_AVATAR, payload: avatar})
export const setDiskSpace = (space) => ({type: SET_DISK_SPACE, payload: space})
export const setUsedSpace = (space) => ({type: SET_USED_SPACE, payload: space})








