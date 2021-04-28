const express = require('express');
const router = express.Router();
const user_route = require('./route/user_route');

router.post('/', user_route.login);
module.exports = router;