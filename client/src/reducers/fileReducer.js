const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const POP_FROM_STACK = 'POP_FROM_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_CURRENT_DIR_NAME = 'SET_CURRENT_DIR_NAME'
const PUSH_TO_DIR_NAME_STACK = 'PUSH_TO_DIR_NAME_STACK'
const SET_VIEW = 'SET_VIEW'
const SET_HEADER_DISPLAY = 'SET_HEADER_DISPLAY'
const SET_CURRENT_FILE = 'SET_CURRENT_FILE'
const SET_INFO_DISPLAY = 'SET_INFO_DISPLAY'
const CHECKED_FILE = 'CHECKED_FILE'

const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: 'none',
    dirStack: [],
    dirName: 'MERN',
    dirNameStack: [],
    view: 'list',
    headerDisplay: 'none',
    currentFile: {},
    infoDisplay: 'none',
    checkedFile: []

}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case SET_CURRENT_DIR_NAME:
            return {
                ...state,
                dirName: action.payload,
            }
        case PUSH_TO_DIR_NAME_STACK:
            return {
                ...state,
                dirNameStack: [...state.dirNameStack, action.payload]
            }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case SET_POPUP_DISPLAY:
            return {
                ...state,
                popupDisplay: action.payload
            }
        case SET_HEADER_DISPLAY:
            return {
                ...state,
                headerDisplay: action.payload
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case POP_FROM_STACK:
            return {
                ...state,
                popupDisplay: action.payload
            }
        case DELETE_FILE:
            return {
                ...state,
                files: [...state.files.filter(file => file._id != action.payload)]
            }
        case SET_VIEW:
            localStorage.setItem('view', action.payload)
            return {
                ...state,
                view: action.payload,
                headerDisplay: 'none'
            }
        case SET_CURRENT_FILE:
            return {
                ...state,
                currentFile: action.payload.file
            }
        case SET_INFO_DISPLAY:
            return {
                ...state,
                infoDisplay: action.payload
            }
        case CHECKED_FILE:
            return {
                ...state,
                checkedFile: [action.payload]
            }
        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const setPopupDisplay = (display) => ({type: SET_POPUP_DISPLAY, payload: display})
export const setHeaderDisplay = (display) => ({type: SET_HEADER_DISPLAY, payload: display})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId})
export const setCurrentDirName = (dirName) => ({type: SET_CURRENT_DIR_NAME, payload: dirName})
export const pushToDirNameStack = (dirName) => ({type: PUSH_TO_DIR_NAME_STACK, payload: dirName})
export const setView = (payload) => ({type: SET_VIEW, payload})
export const setCurrentFile = (file) => ({type: SET_CURRENT_FILE, payload: file})
export const setInfoDisplay = (display) => ({type: SET_INFO_DISPLAY, payload: display})
export const setCheckedFile = (file) => ({type: CHECKED_FILE, payload: file})