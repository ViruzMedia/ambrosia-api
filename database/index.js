//***************PACKAGE-IMPORTS***************
const mongo = require('mongoose')

//****************FILE-IMPORTS*****************
const config = require('../misc/config.misc');
const msg = require('../misc/msg.misc');

//*******************SCRIPT********************

class Database {
    async connect() {
        await mongo.connect(config.db_string, {useNewUrlParser: true}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(Date.now() + " " + msg.db_connected)
            }
        });
    }
}

const database = new Database;
module.exports = database;
