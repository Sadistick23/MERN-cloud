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