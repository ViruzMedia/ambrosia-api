//NPM-IMPORTS
const jwt = require('jsonwebtoken');

//MISC-IMPORTS
const config = require('../misc/config.misc')
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//FILE-IMPORTS
const account_db_fnc = require('../database/functions/account.db.fnc');

class Account_Fnc {
    async credential_login(req, username, password, res) {
        if (!username) {
            return res.json({
                error: true,
                message: msg.reglog_noUsername
            })
        } else if (!password) {
            return res.json({
                error: true,
                message: msg.reglog_noPassword
            })
        } else {
            const d = await account_db_fnc.getAccountByUsername(username);
            const hashPassword = await misc.hashPassword(password);
            if (!d[0]) {
                return res.json({
                    error: true,
                    msg_style: "error",
                    message: msg.login_doesExist
                })
            } else if (d[0].password !== hashPassword) {
                return res.json({
                    error: true,
                    msg_style: "error",
                    message: msg.login_WrongPW
                })
            } else {
                const payload = { check: true };
                var token = jwt.sign(payload, config.api_secret, {
                    // expiresIn: 2592000 // expires in 24 hours x 30
                    expiresIn: 60 * 60 //expires in 60 minutes
                });
                var key = jwt.sign(payload, hashPassword, {
                    expiresIn: 60 * 60 * 24 * 7 // expires in 7 Days
                });
                if (key && token) {
                    await account_db_fnc.getAccountByUIDAndUpdateKey(d[0]._id, key)
                    return res.json({
                        error: false,
                        id: d[0]._id,
                        user: username,
                        key: key,
                        token: token,
                        msg_style: "success",
                        message: msg.login_succesfull
                    })
                }
            }
        }
    }
    async key_login(req, uid, key, res) {
        if (!uid) {
            return res.json({
                error: true,
                msg_style: "error",
                message: msg.uid_not_provided
            })
        } else if (!key) {
            return res.json({
                error: true,
                msg_style: "error",
                message: msg.key_no_provided
            })
        } else {
            const d = await account_db_fnc.getAccountByUID(uid);
            if (!d || d == undefined) {
                return res.json({
                    error: true,
                    msg_style: "error",
                    message: msg.login_doesExist
                })
            } else if (d[0].key !== key) {
                return res.json({
                    error: true,
                    msg_style: "error",
                    message: msg.key_expired
                })
            } else {
                const secret = d[0].password;
                const payload = { check: true };
                var token = jwt.sign(payload, config.api_secret, {
                    expiresIn: 60 * 60 //60 Minutes
                });
                if (!token) {
                    return res.json({
                        error: true,
                        msg_style: "error",
                        message: msg.token_no_provided
                    })
                } else if (!secret) {
                    return res.json({
                        error: true,
                        msg_style: "error",
                        message: msg.key_no_secret
                    });
                } else {
                    await jwt.verify(key, secret, (err, decoded) => {
                        if (err) {
                            return res.json({
                                error: true,
                                msg_style: "warning",
                                message: msg.key_expired
                            });
                        } else {
                            req.decoded = decoded;
                            return res.json({
                                error: false,
                                msg_style: "success",
                                message: msg.key_accepted,
                                token: token
                            })
                        }
                    })
                }
            }
        }
    }
    async register_account(req, username, password_unhashed, firstname, lastname, birthday, street, number, city, plz, email, tel_mobil, tel_work, tel_home, instagram, facebook, twitter, snapchat, res) {
        if (!username) {
            return res.json({
                error: true,
                message: msg.reglog_noUsername
            })
        } else if (!password_unhashed) {
            return res.json({
                error: true,
                message: msg.reglog_noPassword
            })
        } else if (!firstname) {
            return res.json({
                error: true,
                message: msg.reg_noFirstname
            })
        } else if (!lastname) {
            return res.json({
                error: true,
                message: msg.reg_noLastname
            })
        } else if (!birthday) {
            return res.json({
                error: true,
                message: msg.reg_noBirthday
            })
        } else if (!street) {
            return res.json({
                error: true,
                message: msg.reg_noStreet
            })
        } else if (!number) {
            return res.json({
                error: true,
                message: msg.reg_noNumber
            })
        } else if (!city) {
            return res.json({
                error: true,
                message: msg.reg_noCity
            })
        } else if (!plz) {
            return res.json({
                error: true,
                message: msg.reg_noPlz
            })
        } else if (!email) {
            return res.json({
                error: true,
                message: msg.reg_noEmail
            })
        } else if (!tel_mobil) {
            return res.json({
                error: true,
                message: msg.reg_telephone
            })
        } else {
            const acc_by_username = await account_db_fnc.getAccountByUsername(username);
            const acc_by_email = await account_db_fnc.getAccountByEmail(email);
            if (acc_by_username[0]) {
                return res.json({
                    error: true,
                    message: msg.reg_alreadyRegisterd,
                    spec: msg.reg_dublicateUsername
                });
            } else if (acc_by_email[0]) {
                return res.json({
                    error: true,
                    message: msg.reg_alreadyRegisterd,
                    spec: msg.reg_dublicateMail
                });
            } else {
                const password = await misc.hashPassword(password_unhashed);
                await account_db_fnc.register_account(req, username, password, firstname, lastname, birthday, street, number, city, plz, email, tel_mobil, tel_work, tel_home, instagram, facebook, twitter, snapchat, res)
            }
        }
    }
}

const account_fnc = new Account_Fnc();
module.exports = account_fnc;