const router = require("express").Router()
const Salon = require('../models/salons')
const categories= require('../models/categories')
const Category = require("../models/categories")
const services= require("../models/service")
const Service = require("../models/service")
const emp= require("../models/employee")
const Booking = require("../models/booking")


router.get('/', async (req,res)=>{
    try{
    const salon= await Salon.find()
    res.render('salons/all-salons.ejs', {salons : salon})
    }catch(err){console.log(err)}
})

router.get("/booking-details", async(req,res)=>{
    try{

    const service = await Service.findById(req.query.service);

    const employee = await emp.findById(req.query.employee);
    const isGift= await Booking.findById(req.query.isGift)


    res.render("salons/booking-details.ejs",{
        user: req.session.user_id,

        service,
        price: service.price,
        employee,

        date:req.query.date,
        time:req.query.time,
        isGift

    });
}catch(err){console.log(err)}

});
router.get("/appointments", async (req, res) => {
    try {
        

        const bookings = await Booking.find({
            user: req.session.user._id
        })
            .populate("service_id")
            .populate("salon_id")
            .populate("employee_id"); 

        

        res.render("salons/appointment.ejs", {
            bookings , updated: req.query.updated
        });

    } catch (err) {
        console.log(err);
    }
});

router.get('/:salonId', async (req,res)=>{
    try{
    const salonFind= await Salon.findById(req.params.salonId)
    

    const categories= await Category.find({salon_id: salonFind._id}).populate("services") 
    const services= await Service.find({salon_id: salonFind._id}).populate('category_id')
    res.render('salons/oneSalon.ejs', {salonFind , categories, services} )
    }catch(err){console.log(err)}
})



router.get("/booking/:serviceId", async (req, res) => {
    try {
        const service = await Service.findById(req.params.serviceId);

        const employees = await emp.find({
            salon_id: service.salon_id
        });

        let dates = []; 

        for (let i = 0; i < 7; i++) { 

            let date = new Date(); 

            date.setDate(date.getDate() + i);

            dates.push({
                value: date.toISOString().split("T")[0],
                display: date.toLocaleDateString("en-US", { 
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
        user,
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
        user: req.session.user._id,

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


router.delete("/appoint/:id", async (req, res) => {
    try{
   await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/salons/appointments");
}catch(err){console.log(err)}
});

router.get("/appoint/:id/update", async (req,res)=>{
    try{
const update = await Booking.findById(req.params.id)
res.render("salons/update.ejs", {updateBookings: update})
    }catch(err){console.log(err)}
})

router.put("/appoint/:id", async (req,res)=>{
    try{
    if(req.body.isGift==="on"){
        req.body.isGift=true;
    }else{
        req.body.isGift= false;
    }
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/salons/appointments?updated=true");
    }catch(err){console.log(err)}
})












module.exports = router;