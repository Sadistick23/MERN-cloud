import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../utils/config";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `${API_URL}/api/file`
            if (dirId) {
                url = `${API_URL}/api/file?parent=${dirId}`
            }
            if (sort) {
                url = `${API_URL}/api/file?sort=${sort}`
            }
            if (dirId && sort) {
                url = `${API_URL}/api/file?parent=${dirId}&sort=${sort}`
            }
             const response = await axios.get(url,{
                 headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
             })
            dispatch(setFiles(response.data.files))
        } catch (e) {
            console.log(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}
export function createDir(dirId, fileName) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/file`,{
                fileName,
                parent: dirId,
                type: 'dir'
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export function renameDir(dirId, fileName, newName, type) {
    return async dispatch => {
        try {
            const response = await axios.put(`${API_URL}/api/file`,{
                oldFileName: fileName,
                newFileName: newName,
                type: type,
                parent: dirId
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`${API_URL}/api/file/upload`, formData,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    uploadFile.progress = progressEvent.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    dispatch(changeUploadFile(uploadFile))
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export async function downloadFile(file, dirId) {
    const response = await fetch(`${API_URL}/api/file/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}
export function deleteFile(file) {
    return async  dispatch =>  {
        try {
            const response = await axios.delete(`${API_URL}/api/file?id=${file._id}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(deleteFileAction(file._id))
            console.log(response.data.message)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export function searchFile(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/file/search?search=${search}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            console.log(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}