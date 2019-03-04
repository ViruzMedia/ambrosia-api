//***************PACKAGE-IMPORTS***************
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//****************FILE-IMPORTS*****************
const msg = require('./msg.misc');

const role_db_fnc = require('../database/functions/role.db.fnc')

//******************SCRIPT*********************
class Misc_Functions {
    async check_api_token(req, res, next, secret) {
        const token = req.headers['access'];
        if (!token) {
            return res.json({
                error: true,
                msg_style: "error",
                message: msg.token_no_provided
            });
        } else if (!secret) {
            return res.json({
                error: true,
                msg_style: "error",
                message: msg.token_no_secret
            });
        } else {
            await jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        error: true,
                        msg_style: "warning",
                        message: msg.token_expired
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
    }

    async check_user_roles(req, res, needed_role, needed_priority) {
        const uid = req.headers['user_identification'];
        const uik = req.headers['user_identification_key'];

        if (!uid) {
            return false;
        } else if (!uik) {
            return false;
        } else {
            const d = await role_db_fnc.getAllRolesWhereUser(req, uid, res);
            if (!d) {
                return false;
            } else if (!needed_role) {
                return false;
            } else if (!d[0]._id) {
                return false;
            } else {
              
                if (needed_role == d[0]._id) {
                    return true;
                } else if (needed_priority <= d[0].priority) {
                    return true;
                } else {
                    return false;
                }
            }
        }

    }

    hashPassword(str) {
        const cipher = crypto.createCipher('aes192', 'a pass');
        let encrypted = cipher.update(str, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
};

const misc_functions = new Misc_Functions;
module.exports = misc_functions;