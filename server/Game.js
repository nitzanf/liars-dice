const User = require('./User');

module.exports = class Game {
    constructor(){
        this.numUsers = 0;
        this.users = [];
        this.usernames = {};
    }

    getUserByAddress(address) {
        return this.users.filter(user => {
            if (user.address === address) {
                return true;
            }
        })[0];
    }

    usernameExists(username) {
        return this.usernames[username] ? true: false;
    }

    addUser(data) {
        const user = this.getUserByAddress(data.address);
        let response;
        if (!user) {
            if (!this.usernameExists(data.username)) {
                this.users.push(new User(data));
                this.usernames[data.username] = 1;
                response = {
                    ok: true,
                    msg: `${data.username} added.`
                }
            } else {
                response = {
                    ok: false, 
                    msg: `Username exists.`
                }
            }
        } else {
            response = {
                ok: false,
                msg: 'User exists'
            }
        }
        return response;
    }

    getNumOfUsers() {
        return this.users.length;
    }
}