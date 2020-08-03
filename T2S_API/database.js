const sqlite = require('sqlite3')
const db = new sqlite.Database("database.db")
const bcrypt = require('bcryptjs')
    //DB INITIALISATION
db.run(`
CREATE TABLE IF NOT EXISTS history(
    id INTEGER PRIMARY KEY NOT NULL UNIQUE,
    json
)
`)

//GET stuffs

exports.addToHistory = function(entry, callback) {
    query = "INSERT INTO history (json) VALUES (?)"
    value = [entry]
    db.run(query, value, function(error) {
        if (error) {callback(error)} else {callback(null)}
    })
}

exports.gethistory = function(callback) {
    query = "SELECT * FROM history ORDER BY id DESC"
    db.all(query, function(error, answer) {
        if (error) { callback(error) } else { callback(null, answer) }
    })
}

exports.deletefromhistory = function(id,callback) {
    query = "DELETE FROM history WHERE id = ?"
    value = [id]
    db.run(query,value, function(error){
        if (error) { callback(error) } else { callback(null) } 
    })
}