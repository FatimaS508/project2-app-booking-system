const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const connectToDB = require('./db.js')
const Salon = require('./models/salons.js')
const Category= require('./models/categories.js')
const Service= require('./models/service.js')

connectToDB()

async function seedDB(){
    try{ 
        await Salon.deleteMany({});
        await Category.deleteMany({});
        await Service.deleteMany({})


    const createdSalons = await Salon.insertMany([
        {
          name: "Aroma Beauty Lounge" ,
          address: "752, Saar area 507",
          salon_URL: "/images/1-aroma-header.jpeg" //show the 1-aroma-header.jpeg
        },
        {
            name: "blossom district beauty salon",
            about:"A salon specializing in nails and massage, in addition to eyelashes, lightening and tinting of eyelashes and eyebrows, skin cleaning, body scrubs and henna.",
            address: "GB Cafe A'ali, block 732",
            salon_URL: "/images/2-blossom-header.jpeg"
        },
    ])
console.log(createdSalons)

const serviceCreate= await Service.insertMany([
    {
        name: "Haircut",
        price: 10,
        duration: 30,
        salon_id: createdSalons[0]._id,
        description: "A classic haircut tailored to your style, leaving hair neat and refreshed."
    },
    { name: "Hair Coloring", price: 20, duration: 60, salon_id: createdSalons[0]._id, description: "Professional coloring service with vibrant shades or natural tones to suit your look." },
    { name: "Manicure", price: 8, duration: 25, salon_id: createdSalons[0]._id,  description: "Nail shaping, cuticle care, and polish application for clean, elegant hands." },
    { name: "Massage", price: 15, duration: 45, salon_id: createdSalons[1]._id,  description: "Relaxing full‑body massage to relieve stress, improve circulation, and restore balance." }
]);

const createCategories = await Category.insertMany([
    {
       name: "Hair",
       salon_id: createdSalons[0]._id,
       services: [serviceCreate[1]._id , serviceCreate[0]._id]
       
    },
    {
        name: "Nails",
        salon_id: createdSalons[0]._id,
        services: [serviceCreate[2]._id ]
    },
    {
        name: "Body",
        salon_id: createdSalons[0]._id
    },
    {
        name: "Message",
        salon_id: createdSalons[0]._id,
        services: [serviceCreate[3]._id]
    },
    {
       name: "Hair",
       salon_id: createdSalons[1]._id,
       services: [serviceCreate[1]._id , serviceCreate[0]._id]
    },
    {
        name: "Nails",
        salon_id: createdSalons[1]._id,
        services: [serviceCreate[2]._id ]
    },
    {
        name: "Body",
        salon_id: createdSalons[1]._id
    },
    {
        name: "Eyelashes & Eybrow",
        salon_id: createdSalons[1]._id
    },
    {
        name: "Makeup",
        salon_id: createdSalons[1]._id
    }
])



}catch(err){
    console.error("Seeding error:", err);
}
}



seedDB()