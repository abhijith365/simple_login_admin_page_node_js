const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const userHelper = require('../helper/userHelper');


route.get('/', (req, res) => {
    const message = req.session.message;
    req.session.message = "";
    res.render('register', { message: message });
})

route.post('/', async (req, res) => {

    const count = await userHelper.userCount(req.body).then(data => data.user);

    if (!count) {
        const hashpass = await bcrypt.hash(req.body.password, 10);
        const obj = {
            "username": req.body.username,
            "email": req.body.email,
            "password": hashpass
        }

        userHelper.addUser(obj);
        req.session.message = "user data inserted";
        res.redirect('register');
    }
    else {
        req.session.message = "user already exist";
        res.redirect('register');
    }



})


module.exports = route;