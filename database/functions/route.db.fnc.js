//****************FILE-IMPORTS*****************
const route_schema = require('../schemas/route.schema');
const msg = require('../../misc/msg.misc');
//*****************SCRIPT**********************

class Route_Db_fnc {
    async addRoute(req, name, route, needed_priority, needed_role, res) {
        const newRoute = new route_schema({
            name: name,
            route: route,
            needed_priority: needed_priority,
            needed_role: needed_role
        })

        await newRoute.save(function (req, err, res) {
            if (err) {
                return console.log(err);
            }
        });

        return res.status(201).send({
            error: false,
            message: msg.route_created
        })

    }
    async getAllRoutes(req, res) {
        route_schema.find({}, (err, doc) => {
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
    async getRouteByRoute(req, route, res) {
        return new Promise((r, j) => route_schema.find({ route: route }, null, (err, data) => {
            if (err) {
                return j(err);
            } else {
                r(data);
            }
        }))
    }
}

const route_db_fnc = new Route_Db_fnc();
module.exports = route_db_fnc;