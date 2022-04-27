const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    if (req.session.email) {
        res.header('cache-control', 'private,no-cache,no-store,must revalidate')
        res.header('Express', '-1')
        res.header('paragrm', 'no-cache')
        res.render('home', { name: req.session.username })
    } else {
        res.redirect('login');
    }
})

module.exports = route;