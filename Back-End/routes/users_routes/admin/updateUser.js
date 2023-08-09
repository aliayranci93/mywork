const { pool, Pool } = require("../../../utils/connection.js")

module.exports = {
    name: "admin/UpdateUser",
    execute: async (req, res) => {
        await update(req.body);
        res.json({message:"User succesfully updated!"})
    }
}


function update(data){
    return new Promise((resolve, reject) => {
        pool.query('UPDATE accounts SET name=$1, phone=$2, job=$3 WHERE id=$4', [data.name, data.phone, data.job, data.id], (err) =>{
            if(err){
                console.log(err);
                reject(err);
            }
            resolve()
        })
    })
}