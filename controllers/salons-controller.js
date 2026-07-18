const router = require("express").Router()
const Salon = require('../models/salons')
const categories= require('../models/categories')
const Category = require("../models/categories")
const services= require("../models/service")
const Service = require("../models/service")

router.get('/', async (req,res)=>{
    const salon= await Salon.find()
    res.render('salons/all-salons.ejs', {salons : salon})
})

router.get('/:salonId', async (req,res)=>{
    const salonFind= await Salon.findById(req.params.salonId)
    

    const categories= await Category.find({salon_id: salonFind._id}).populate("services") //find all documents in category collection has salon id match value we clicked
    const services= await Service.find({salon_id: salonFind._id}).populate('category_id')
    res.render('salons/oneSalon.ejs', {salonFind , categories, services} )
})





module.exports = router;