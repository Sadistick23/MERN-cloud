const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_UPLOADER = 'REMOVE_UPLOADER'
const CHANGE_UPLOADER = 'CHANGE_UPLOADER'

const defaultState = {
    isVisible: false,
    files: [],

}

export default function uploadReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_UPLOADER: return {...state, isVisible: true}
        case HIDE_UPLOADER: return {...state, isVisible: false}
        case ADD_UPLOAD_FILE: return {...state, files: [...state.files, action.payload]}
        case REMOVE_UPLOADER: return {...state, files: [...state.files.filter(file => file.id != action.payload)]}
        case CHANGE_UPLOADER:
            return {
                ...state,
                files: [...state.files.map(file => file.id == action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : {...file}
                )]
            }
        default:
            return state
    }
}

export const showUploader = () => ({type: SHOW_UPLOADER})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploadFile = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = (fileId) => ({type: REMOVE_UPLOADER, payload: fileId})
export const changeUploadFile = (payload) => ({type: CHANGE_UPLOADER, payload: payload})
