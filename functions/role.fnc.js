//NPM-IMPORTS


//MISC-IMPORTS
const config = require('../misc/config.misc')
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//FILE-IMPORTS
const role_db_fnc = require('../database/functions/role.db.fnc');

class RoleFnc {
    async addRole(req, name, color, priority, res) {
        if (!name) {
            return res.json({
                error: true,
                message: msg.reglog_noUsername
            })
        } else if (!priority) {
            return res.json({
                error: true,
                message: msg.reg_noFirstname
            })
        } else {
            role_db_fnc.addRole(req, name, color, priority, res);
        }
    }
    async addUserToRole(req, role_id, uid, res) {
        if (!role_id) {
            return res.json({
                error: true,
                message: msg.role_id_not_provided
            })
        } else if (!uid) {
            return res.json({
                error: true,
                message: msg.uid_not_provided
            })
        } else {
            await role_db_fnc.addUserToRole(req, role_id, uid, res);
        }
    }
    async getAllRoles(req, res) {
        await role_db_fnc.getAllRoles(req, res);
    }
    async getAllRolesWhereUser(req, uid, res) {
        await role_db_fnc.getAllRolesWhereUser(req, uid, res);
    }
}

const rolefnc = new RoleFnc();
module.exports = rolefnc;