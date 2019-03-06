//***************PACKAGE-IMPORTS***************
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//****************FILE-IMPORTS*****************
const msg = require('./msg.misc');

const role_db_fnc = require('../database/functions/role.db.fnc')
const account_db_fnc = require('../database/functions/account.db.fnc')
const route_db_fnc = require('../database/functions/route.db.fnc')

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

    async check_user_roles(req, res) {
        const uid = req.headers['user_identification'];
        const uik = req.headers['user_identification_key'];

        const data = await account_db_fnc.getAccountByUID(uid)
        // console.log(data)
        if (!data || data == undefined) {
            //console.log('1')
            return false;
        } else if (data[0].key !== uik) {
            //console.log('2')
            return false;
        } else {
            const uik_secret = data[0].password;
            await jwt.verify(uik, uik_secret, async (err, decoded) => {
                if (err) {
                    //console.log('3')
                    return false;
                }
            })
            const d = await role_db_fnc.getAllRolesWhereUser(req, uid, res);
            const route = req.route.path;
            const route_check = await route_db_fnc.getRouteByRoute(req, route, res);
            if (!d) {
                //console.log('4')
                return false;
            } else if (!route_check || route_check == undefined) {
                // console.log('5')
                return false;
            } else if (!d[0]._id) {
                // console.log('6')
                return false;
            } else {
                if (route_check[0].needed_role == d[0]._id) {
                    // console.log('7')
                    return true;
                } else if (route_check[0].needed_priority <= d[0].priority) {
                    //console.log('8')
                    return true;
                } else {
                    // console.log('9')
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