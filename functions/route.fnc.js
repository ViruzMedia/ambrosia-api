//NPM-IMPORTS


//MISC-IMPORTS
const config = require('../misc/config.misc')
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//FILE-IMPORTS
const route_db_fnc = require('../database/functions/route.db.fnc');
const role_db_fnc = require('../database/functions/role.db.fnc');

class Route_Fnc {
    async addRoute(req, name, route, needed_priority, needed_role, res) {
        if (!name) {
            return res.json({
                error: true,
                message: msg.route_no_name
            })
        } else if (!route) {
            return res.json({
                error: true,
                message: msg.route_no_route
            })
        } else if (!needed_priority) {
            return res.json({
                error: true,
                message: msg.route_no_priority
            })
        } else if (!needed_role) {
            return res.json({
                error: true,
                message: msg.route_no_role
            })
        } else {
            await route_db_fnc.addRoute(req, name, route, needed_priority, needed_role, res)
        }
    }
    async getAllRoutes(req, res) {
        await route_db_fnc.getAllRoutes(req, res);
    }
    async getRouteByRoute(req, route, res) {
        await route_db_fnc.getRouteByRoute(req, route, res);
    }
    async checkRoute(req, route_name, res) {
        if (!route_name) {
            return res.json({
                error: true,
                message: msg.route_no_route
            })
        } else {
            const uid = req.headers['user_identification'];
            const role_response = await role_db_fnc.getAllRolesWhereUser(req, uid, res)
            const router_response = await route_db_fnc.getRouteByName(req, route_name, res)
          //  console.log(role_response)
           // console.log(router_response)
            console.log(role_response[0].priority >= router_response[0].needed_priority)
            console.log(role_response[0]._id == router_response[0].needed_role)
            if (role_response[0].priority >= router_response[0].needed_priority) {
                return res.status(201).send({
                    error: false,
                    message: 'access granted by prio'
                })
            } else if (role_response[0]._id == router_response[0].needed_role) {
                return res.status(201).send({
                    error: false,
                    message: 'access granted by role'
                })
            } else {
                return res.status(201).send({
                    error: true,
                    message: msg.role_no_permission
                })
            }
        }
    }
}

const route_fnc = new Route_Fnc();
module.exports = route_fnc;