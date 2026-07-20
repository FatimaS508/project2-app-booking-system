const router = require("express").Router()
const Salon = require('../models/salons')
const categories= require('../models/categories')
const Category = require("../models/categories")
const services= require("../models/service")
const Service = require("../models/service")
const emp= require("../models/employee")
const Booking = require("../models/booking")

/*router.get("/FR", async (req, res) => {
  res.render("salons/timing.ejs");
});*/

router.get('/', async (req,res)=>{
    const salon= await Salon.find()
    res.render('salons/all-salons.ejs', {salons : salon})
})

router.get("/booking-details", async(req,res)=>{

    const service = await Service.findById(req.query.service);

    const employee = await emp.findById(req.query.employee);
    const isGift= await Booking.findById(req.query.isGift)


    res.render("salons/booking-details.ejs",{

        service,
        employee,

        date:req.query.date,
        time:req.query.time,
        isGift

    });

});

router.get('/:salonId', async (req,res)=>{
    const salonFind= await Salon.findById(req.params.salonId)
    

    const categories= await Category.find({salon_id: salonFind._id}).populate("services") //find all documents in category collection has salon id match value we clicked
    const services= await Service.find({salon_id: salonFind._id}).populate('category_id')
    res.render('salons/oneSalon.ejs', {salonFind , categories, services} )
})



router.get("/booking/:serviceId", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId);

        const employees = await emp.find({
            salon_id: service.salon_id
        });

        let dates = []; //make cards

        for (let i = 0; i < 7; i++) { //7 cards

            let date = new Date(); //create fresh today's date everytime

            date.setDate(date.getDate() + i); //move into the 7 cards

            dates.push({//two version of date
                value: date.toISOString().split("T")[0], //for machine/server to understand it
                display: date.toLocaleDateString("en-US", { //to browser/ show it in page
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                })
            });
        } 

        res.render("salons/booking.ejs", {
            service,
            employees,
            dates
        });
        
        

    } catch (err) {
        console.error(err);
    }
});

router.post("/booking-details", async(req,res)=>{
    try{
    if(req.body.isGift==="on"){
        req.body.isGift= true;
    }else{
        req.body.isGift= false;
    }

    const {
        service_id,
        employee_id,
        date,
        time,
        customerName,
        phone,
        notes,
        isGift

    } = req.body;


    const service = await Service.findById(service_id);


    const booking=await Booking.create({

        service_id,

        employee_id,

        salon_id: service.salon_id,


        date:new Date(date),

        time,

        customerName,

        phone,

        notes,

        isGift
        

    });

        const bookingInfo = await Booking.findById(booking._id).populate("service_id").populate("employee_id");
        console.log(bookingInfo);
        res.render("salons/confirm.ejs", {
            booking: bookingInfo
        });


    }catch(err){
        console.log("booking failed: " +err)
    }

});











module.exports = router;