class Users {
    constructor() {
        this.users = [];
    }

    async addUser(id, name, room) {
        var user = {id, name, room};
      await  this.users.push(user);
        return user;

    }

    removeUser(id) {
        var user = this.getUser(id)
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user
    }

    getUser(id) {
        return this.users.filter((user) => user.id == id)[0]
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name)
        return namesArray;
    }
}

module.exports = {Users}