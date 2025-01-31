DROP TABLE IF EXISTS diary;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL
);

CREATE TABLE diary (
    diary_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    entry_time TIME NOT NULL,
    category VARCHAR(50),
    title VARCHAR(100),
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- INSERT INTO users (username, password) 
-- VALUES 
--   ('user1', 'password123'),
--   ('user2', 'securepass456');

-- INSERT INTO diary (user_id, entry_date, entry_time, category, content) 
-- VALUES 
--   (1, '2024-01-01', '08:30:00', 'Personal', 'New Year, new me!'),
--   (1, '2024-01-02', '12:45:00', 'Work', 'Had a great meeting today.'),
--   (2, '2024-01-03', '18:00:00', 'Health', 'Went for a long run, feeling great!');