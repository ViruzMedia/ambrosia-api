//***************PACKAGE-IMPORTS***************
const express = require('express');
const middleware = express.Router();
//****************FILE-IMPORTS*****************
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

const role_fnc = require('../functions/role.fnc');

//****************SCRIPT*****************

middleware.post('/addRole', async (req, res) => {
    response = await misc.check_user_roles(req, res)
    console.log(response)
    if (response) {
        role_fnc.addRole(
            req,
            req.body.name,
            req.body.color,
            req.body.priority,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }

})

middleware.post('/addUserToRole', async (req, res) => {
    response = await misc.check_user_roles(req, res)
    console.log(response)
    if (response) {
        role_fnc.addUserToRole(
            req,
            req.body.role_id,
            req.body.uid,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }
})

middleware.post('/getAllRolesWhereUser', async (req, res) => {
    response = await misc.check_user_roles(req, res)
    if (response) {
        role_fnc.getAllRolesWhereUser(
            req,
            req.body.uid,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }

})

middleware.get('/getAllGroups', async (req, res) => {
    response = await misc.check_user_roles(req, res)
    if (response) {
        role_fnc.getAllRoles(
            req,
            res
        );
    } else {
        return res.json({
            error: true,
            message: msg.role_no_permission
        })
    }

})



module.exports = middleware;