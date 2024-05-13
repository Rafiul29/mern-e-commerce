const express=require('express')

const seedRouter=express.Router();

seedRouter.get('/',seedUser);

module.exports=seedRouter;
