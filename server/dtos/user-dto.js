module.exports = class UserDto {
    name;
    lastName;
    email;
    id;
    isActivated;
    avatar;
    diskSpace;
    usedSpace;

    constructor(model) {
        this.name = model.name
        this.lastName = model.lastName
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.avatar = model.avatar
        this.diskSpace = model.diskSpace
        this.usedSpace = model.usedSpace
    }
}

