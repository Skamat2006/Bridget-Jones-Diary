const db = require('../database/connect');

class Diary {
    constructor({ diary_id, user_id, entry_date, entry_time, title, category, content }) {
        this.id = diary_id;
        this.user_id = user_id;
        this.entry_date = entry_date;
        this.entry_time = entry_time;
        this.title = title;
        this.category = category;
        this.content = content;
        this.user_id = user_id;
    }

    static async getAll(user_id) {
        const response = await db.query('SELECT * FROM diary WHERE user_id = $1', [user_id]);
        return response.rows.map(d => new Diary(d));
    }

    static async getOneById(id) {
        const response = await db.query('SELECT * FROM diary WHERE diary_id = $1', [id]);
        if (response.rows.length != 1) {
            throw new Error('Diary Entry not found');
        }
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const now = new Date();
        data.entry_date = now.toISOString().split('T')[0];
        data.entry_time = now.toTimeString().split(' ')[1].split('.')[0];


        const { user_id, entry_date, entry_time, title, category, content } = data;
        let response = await db.query("INSERT INTO diary (user_id, entry_date, entry_time, title, category, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING diary_id;",
            [user_id, entry_date, entry_time, title, category, content]);
        const newId = response.rows[0].diary_id;
        const newDiary = await Diary.getOneById(newId);
        return newDiary;
    }

}

module.exports = Diary;