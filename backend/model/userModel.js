import sqlite3 from 'sqlite3';

// Initialize the SQLite database
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        process.exit(1); // Exit the process on database connection error
    } else {
        console.log('SQLite DB connected successfully');
    }
});

// Create the `tasks` table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            duedate TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating tasks table:', err.message);
        }
    });
});

// Utility functions to wrap database operations in Promises
export const runAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this); // `this` contains metadata such as `lastID` and `changes`
            }
        });
    });
};

export const allAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const getAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Export the database instance
export default db;
