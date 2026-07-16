const router = require("express").Router()
const Salon = require('../models/salons')

router.get('/', async (req,res)=>{
    const salon= await Salon.find()
    res.render('salons/all-salons.ejs', {salons : salon})
})

module.exports = router;