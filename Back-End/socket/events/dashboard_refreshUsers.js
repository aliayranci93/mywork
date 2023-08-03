const { pool, Pool } = require("../../utils/connection.js")

module.exports = {
    name:"dashboard/refreshUsers",
    execute: (ws, data) => {
        return JSON.stringify({name:"refresh/usersTable"})
    }
}