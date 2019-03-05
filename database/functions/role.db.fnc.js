//****************FILE-IMPORTS*****************
const group_schema = require('../schemas/role.schema');
const msg = require('../../misc/msg.misc');
//*****************SCRIPT**********************

class Role_Db_fnc {

    async addRole(req, name, color, priority, res) {
        const newGroup = new group_schema({
            name: name,
            color: color,
            priority: priority
        });

        await newGroup.save(function (err) {
            if (err) {
                return console.error(err);
            }
        });
        return res.status(201).send({
            error: false,
            message: msg.role_created
        });
    }
    async addUserToRole(req, role_id, uid, res) {
        if (role_id && uid) {
            await group_schema.findOneAndUpdate({ _id: role_id }, { $addToSet: { member: uid } }, { new: false }, (err, doc) => {
                if (err) {
                    console.log("Error" + err);
                } else {
                    res.json({
                        msg: doc
                    })
                }
            });
        }
    }
    async getAllRoles(req, res) {
        group_schema.find({}, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(201).send({
                    error: false,
                    groups: doc
                });
            }
        })
    }
    async getAllRolesWhereUser(req, uid, res) {
        return new Promise((r, j) => group_schema.find({ member: uid }, null, (err, data) => {
            if (err) {
                return j(err);
            } else {
                r(data);
            }
        }))
    }
}

const role_db_fnc = new Role_Db_fnc();
module.exports = role_db_fnc;