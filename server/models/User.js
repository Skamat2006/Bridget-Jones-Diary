const db = require('../database/connect');

class User {
    constructor({user_id, username, password}) {
        this.id = user_id;
        this.username = username;
        this.password = password;
    }

    static async findByUsername(id) {
        const response = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
        if (response.rows.length != 1) {
            throw new Error('User not found');
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password } = data;
        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;",
            [username, password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;