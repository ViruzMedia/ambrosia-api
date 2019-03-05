//***************PACKAGE-IMPORTS***************
const express = require('express');
const middleware = express.Router();

//****************FILE-IMPORTS*****************
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

const route_fnc = require('../functions/route.fnc');

//****************SCRIPT*****************

middleware.post('/addRoute', async (req, res) => {
    response = await misc.check_user_roles(req, res)
    if (response) {
        route_fnc.addRoute(
            req,
            req.body.name,
            req.body.route,
            req.body.needed_priority,
            req.body.needed_role,
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