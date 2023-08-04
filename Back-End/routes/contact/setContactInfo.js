const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "contact/setContactInfo",
    execute: async (req, res) => {
     
        let sqlString="UPDATE settings SET ";
        let settingsProperties = [];
        let amount = 0;
        if( req.body.subheading != undefined )
        {
            amount++;
            sqlString+="subheading=$" + amount+",";
           settingsProperties.push(req.body.subheading);
        }

        if( req.body.phone != undefined )
        {
            amount++;
       
            sqlString+="phone=$" + amount+",";
            settingsProperties.push(req.body.phone);
        }

        if( req.body.fax != undefined )
        {
            amount++;
          
            sqlString+="fax=$" + amount+",";
            settingsProperties.push(req.body.fax);
        }

        if( req.body.email != undefined )
        {
            amount++;
         
            sqlString+="email=$" + amount+",";
            settingsProperties.push(req.body.email);
        }

        if( req.body.map != undefined )
        {
            amount++;
            sqlString+="map=$" + amount+",";
            settingsProperties.push(req.body.map);
        }

        sqlString=sqlString.substring(0, sqlString.toString().length-1);
       
        settingsProperties.push(1);
        amount++;
        sqlString+=" WHERE id=$" + amount;

        pool.query(sqlString, settingsProperties , (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
    
        })



    }
}