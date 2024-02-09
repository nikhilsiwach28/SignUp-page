const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./database/form_data.db');
// Create the "user" table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            firstname TEXT,
            lastname TEXT,
            username Text,
            email TEXT,
            password TEXT
        )
    `);
});

// Insert a new User
function insertUser(firstName, lastName, userName, email, password,callback) {
    const stmt = db.prepare('INSERT INTO users (firstName, lastName, userName, email, password) VALUES (?, ?, ?, ?, ?)');
    console.log("Stmt :",stmt)
    stmt.run(firstName, lastName, userName, email, password, function(err) {
        if (err) {
            console.error("error",err);
            callback(err,null)
        } else {
            console.error("Insertion successfully")
            callback(null,this.lastID)
        }
    });
}
// Retrieve all user
function getAllUser(callback) {
    db.all('SELECT * FROM users', callback);
}

function getAllUserNames(callback){
    db.all('SELECT username FROM users', callback);
}

module.exports = {
    insertUser,
    getAllUser, 
    getAllUserNames
};
