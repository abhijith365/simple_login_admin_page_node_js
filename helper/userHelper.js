const db = require('../conf/mongo.config');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { response } = require('express');




module.exports = {
    addUser: (obj) => {
        return new Promise(async (resolve, rej) => {
            const res = await db.getDb().collection("users").insertOne(obj);
            let response = {}
            if (res) {
                response.status = true;
                resolve(response)
            } else {
                response.status = false;
                resolve(response);
            }
        }).catch((e) => console.log(err))
    },
    doLogin: (body) => {
        return new Promise(async (resolve, reject) => {
            let response = {};
            let user = await db.getDb().collection("users").findOne({ "email": body.email });
            if (user) {
                await bcrypt.compare(body.password, user.password).then((data) => {
                    response.user = data;
                    response.username = user.username;
                    response.status = true;
                    resolve(response);
                }).catch(e => console.log(e))
            } else {
                response.user = false;
                response.status = false;
                resolve(response)
            }

        })

    },
    adminLogin: (body) => {
        return new Promise(async (resolve, reject) => {
            let response = {};
            let user = await db.getDb().collection("admin").findOne({ "email": body.email });
            if (user) {
                const hashpass = await bcrypt.compare(body.password, user.password).then((data) => {
                    response.user = data;
                    response.username = user.username;
                    response.status = true;
                    resolve(response);
                })
            }
            else {
                response.user = false;
                response.status = false;
                resolve(response);
            }
        })

    }
    ,
    userCount: (body) => {
        return new Promise(async (resolve, reject) => {
            let response = {};
            let user = await db.getDb().collection("users").findOne({ "email": body.email });
            console.log(user)
            if (user) {
                response.user = true;
                response.status = true;
                resolve(response);
            }
            else {
                response.user = false;
                response.status = false;
                resolve(response)
            }

        }).catch(e => console.log(e))
    },
    showUser: () => {
        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('users').find();
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    }, deleteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('users').deleteOne({ "_id": ObjectId(id) });
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    },
    getUser: (id) => {

        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('users').findOne({ "_id": ObjectId(id) });
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    },
    updateUser: (body, id) => {
        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('users').updateOne({ "_id": ObjectId(id) }, {
                $set: {
                    "username": body.username,
                    "email": body.email,
                    "password": body.password
                }
            }).then((response) => { resolve(response) })


        })
    }
}
