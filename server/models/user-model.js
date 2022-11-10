const {Schema, model, ObjectId} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, require: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref:'File'}]
})

module.exports = model('User', UserSchema)


