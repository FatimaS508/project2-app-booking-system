const router = require("express").Router()
const Salon = require('../models/salons')
const categories= require('../models/categories')
const Category = require("../models/categories")
const services= require("../models/service")
const Service = require("../models/service")
const emp= require("../models/employee")

router.get("/FR", async (req, res) => {
  res.render("salons/timing.ejs");
});

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

router.get("/booking/:serviceId", async (req, res) => {

    const service = await Service.findById(req.params.serviceId);

    const employees = await emp.find({
        salon_id: service.salon_id
    });

    res.render("salons/booking.ejs", {
        service,
        employees
    });
});







module.exports = router;