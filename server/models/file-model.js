const {Schema, model, ObjectId} = require('mongoose')

const FileModel = new Schema({
    fileName: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type: String},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    size: {type: Number, default: 0},
    user: {type: ObjectId, ref: 'User'},
    parent: {type: ObjectId, ref: 'File'},
    childs: [{type: ObjectId, ref: 'File'}],
})

module.exports = model('File', FileModel)