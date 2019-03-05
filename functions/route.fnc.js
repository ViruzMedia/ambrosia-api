//NPM-IMPORTS


//MISC-IMPORTS
const config = require('../misc/config.misc')
const misc = require('../misc/fnc.misc');
const msg = require('../misc/msg.misc');

//FILE-IMPORTS
const route_db_fnc = require('../database/functions/route.db.fnc');

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
}
 
const route_fnc = new Route_Fnc();
module.exports = route_fnc;