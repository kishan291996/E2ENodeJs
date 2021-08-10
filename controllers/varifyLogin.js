const request = require('request');
var pool = require('../utils/db')
const config = require('../config/config');
const q = require('q')


module.exports.loginVarify = function (req, res, next) {
    let uname = req.body.username;
    let psd = req.body.password;

    let queryURL = `SELECT * FROM hr_common.tempMaster where username ='${uname}' and password ='${psd}'`;

    pool.getConnection(function (err, connection) {
        if (err) {
            return res.status(500).send({ message: "Can't connect to database." })
        } else {
            connection.query(queryURL, [uname,psd], async function (err, result) {
                connection.destroy()
                if (err) {
                    return res.status(400).send({ message: 'Failure' })
                } else {
                   let updatedData;
                   let msg;
                    if(result.length > 0){
                    updatedData = await siteId(result);
                    msg = "Success";
                    res.status(200).send({
                        message: msg,
                        Data: updatedData
                    })
                    }    
                    else{
                    updatedData = "Invalid Credentials"
                    msg = "Failure"
                    res.status(401).send({
                        message: msg,
                        Data: updatedData
                    })
                    }
                    
                }
            })
        }
    })
}


function siteId(result){
    const deferred = q.defer()
    let siteQueryURL = `SELECT hr_common.tempDetail.map FROM hr_common.tempMaster INNER JOIN hr_common.tempDetail ON ${result[0].siteID} = hr_common.tempDetail.siteID`;
    pool.getConnection(function (err, connection) {
        if (err) {
            deferred.reject(err)
            console.log(err);
            // return (500).send({ message: "Can't connect to database." })
        } else {
            connection.query(siteQueryURL, function (err, result) {
                connection.destroy()
                if (err) {
                    deferred.reject(err)
                    console.log(err);
                } else {
                    deferred.resolve(result[0])
                }
            })
        }
    })
    return deferred.promise
}