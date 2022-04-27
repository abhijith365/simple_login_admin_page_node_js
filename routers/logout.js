const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
    req.session.destroy();
    res.header('cache-control', 'private,no-cache,no-store,must revalidate')
    res.header('Express', '-1')
    res.header('paragrm', 'no-cache')
    res.redirect('/');
})

module.exports = route;