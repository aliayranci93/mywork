const { pool, Pool } = require("../utils/connection");

exports.insertData = (data) => { // json type data
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO todo (id, priority, title, description, status, assignee, created_at, updated_at, project, key)\
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                    [data.id, data.priority, data.title, data.summary, data.status, data.assignee, new Date(data.createdAt), new Date(data.updatedAt), data.project, data.key],
                    (err) => {
                        if(err){
                            reject(err);
                        }
                        resolve();
                    })
    })
}


exports.isProjectExist = (projectID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT name FROM projects WHERE id=$1', [projectID], (err, result) => {
            if(err){
                reject(err);
            }
            resolve(result.rows[0] ? true : false);
        })
    })
}

exports.createProject = (projectID, projectName) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO projects (id, name) VALUES ($1, $2)', [projectID, projectName], (err) => {
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}