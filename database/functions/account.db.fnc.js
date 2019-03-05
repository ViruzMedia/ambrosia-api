
//***************PACKAGE-IMPORTS***************


//****************FILE-IMPORTS*****************
const account_schema = require('../schemas/account.schema');
const msg = require('../../misc/msg.misc');

class Account_Db_Functions {
    async register_account(req, username, password, firstname, lastname, birthday, street, number, city, plz, email, tel_mobil, tel_work, tel_home, instagram, facebook, twitter, snapchat, res) {
        const newAccount = new account_schema({
            username: username,
            password: password,
            personal: {
                firstname: firstname,
                lastname: lastname,
                birthday: birthday,
                address: {
                    street: street,
                    number: number,
                    city: city,
                    plz: plz
                }
            },
            contact: {
                email: email,
                tel_mobil: tel_mobil,
                tel_work: tel_work,
                tel_home: tel_home,
            },
            social: {
                instagram: instagram,
                facebook: facebook,
                twitter: twitter,
                snapchat: snapchat,
            }
        });
        newAccount.save(function (err) {
            if (err) {
                return console.error(err);
            }
        });
        return res.status(201).send({
            error: false,
            message: msg.reg_created
        });
    }
    async getAccountByUID(data) {
        return new Promise((r, j) => account_schema.find({ _id: data }, null, (err, data) => {
            if (err) {
                r(data)
            } else {
                r(data);
            }

        }))
    }
    async getAccountByUsername(data) {
        return new Promise((r, j) => account_schema.find({ username: data }, null, (err, data) => {
            if (err) {
                console.log({ username: data });
                return j(err);
            } else {
                r(data);
            }

        }))
    }
    async getAccountByEmail(data) {
        return new Promise((r, j) => account_schema.find({ mail: data }, null, (err, data) => {
            if (err) {
                console.log({ mail: data });
                return j(err);
            } else {
                r(data);
            }
        }))
    }
    async getAccountByUIDAndUpdateKey(uid, key) {
        if (uid && key) {
           await account_schema.findOneAndUpdate({ _id: uid }, { $set: { key: key } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Error" + err);
                } else {
                    return doc
                }
            });
        }
    }
}

const account_db_functions = new Account_Db_Functions;
module.exports = account_db_functions;
