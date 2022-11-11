const fs = require('fs')

class FileService {

    createDir(req, file) {
        const filePath = `${req.filePath}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: "Папка была успешно создана"})
                } else {
                    return reject({message: "Папка уже существует"})
                }
            } catch (e) {
                return reject({message: 'File ERROR'})
            }
        })
    }
    renameDir(req, file, oldFilePath, newFilePath) {
        const oldPath = `${req.filePath}\\${file.user}\\${oldFilePath}`
        const newPath = `${req.filePath}\\${file.user}\\${newFilePath}`
        return new Promise((resolve, reject) => {
            try {
                if (fs.existsSync(oldPath)) {
                    fs.rename(oldPath, newPath, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                    return resolve({message: "Файл переименован"})
                } else {
                    return reject({message: "Такой папки не существует"})
                }

            } catch (e) {
                return reject({message: 'Ошибка при переименовании файла'})
            }
        })
    }
    renameFile(req, file, oldFilePath, newFilePath) {
        const oldPath = `${req.filePath}\\${file.user}\\${oldFilePath}`
        const newPath = `${req.filePath}\\${file.user}\\${newFilePath}`
        return new Promise((resolve, reject) => {
            try {
                if (fs.existsSync(oldPath)) {
                    fs.rename(oldPath, newPath, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                    return resolve({message: "Файл переименован"})
                } else {
                    return reject({message: "Такой папки не существует"})
                }
            } catch (e) {
                return reject({message: 'Ошибка при переименовании файла'})
            }
        })
    }
    deleteFile(req, file) {
        const filePath = `${req.filePath}\\${file.user}\\${file.path}`
        if (file.type === 'dir') {
            fs.rmdirSync(filePath)
        } else {
            fs.unlinkSync(filePath)
        }
    }
}

module.exports = new FileService()