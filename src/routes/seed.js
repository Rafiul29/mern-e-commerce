const express=require('express');

const seedUser = require('../seedController/seedUsers');

const router=express.Router();

router.get('/users',seedUser);


module.exports=router;
