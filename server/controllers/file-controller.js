const fileService = require('../service/file-service')
const User = require('../models/user-model')
const File = require('../models/file-model')
const fs = require('fs')
const userService = require("../service/user-service");
const UserModel = require("../models/user-model");


class FileController {
    async createDir(req, res) {
        try {
            const {fileName, type, parent} = req.body
            const file = new File({fileName, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
                file.path = fileName
                await fileService.createDir(req, file)
            } else {
                file.path = `${parentFile.path}\\${file.fileName}`
                await fileService.createDir(req, file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e})
        }
    }
    async fetFiles(req, res) {
        try {
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break;
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break;
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break;
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break;
            }
            return res.json({files})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Файлы не обнаружены"})
        }
    }
    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "Недостаточно места для загрузки"})
            }
            user.usedSpace = user.usedSpace + file.size

            let path;
            if (parent) {
                path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${req.filePath}\\${user._id}\\${file.name}`
            }
            if (fs.existsSync(path)) {
                return res.status(400).json({message: "Файл с таким именем уже существует"})
            }
            file.mv(path)
            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + "\\" + file.name
            }
            const dbFile = new File({
                fileName: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent ? parent._id : null,
                user: user._id
            })

            await dbFile.save()
            await user.save()
            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Ошибка загрузки файла"})
        }
    }
    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = req.filePath + '\\' + req.user.id + '\\' + file.path
            if (fs.existsSync(path)) {
                return res.download(path, file.fileName)
            }
            return res.status(400).json({message: "Файл не найден"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка при скачивании файла"})
        }
    }
    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const user = await UserModel.findById(req.user.id)
            user.usedSpace = user.usedSpace - file.size
            if (user.usedSpace <= 0) {
                user.usedSpace = 0
            }
            await user.save()
            if (!file) {
                return res.status(400).json({message: "Файл не найден"})
            }
            fileService.deleteFile(req, file)
            await file.remove()
            return res.json({message: "Файл успешно удален"})
        } catch (e) {
            return res.status(400).json({message: "Папка должна быть пуста!"})
        }
    }
    async searchFile(req, res) {
        try {
            const searchName = req.query.search
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.fileName.includes(searchName))
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Search error"})
        }
    }
    async uploadUserAvatar(req, res, next) {
        try {
            const file = req.files.file
            const userModel = req.user.id
            const avatar = await userService.uploadUserAvatar(req, file, userModel)
            const user = await UserModel.findById(req.user.id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController()