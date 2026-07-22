const dotenv = require("dotenv").config() 
const connectToDB = require('./db.js')
const Salon = require('./models/salons.js')
const Category= require('./models/categories.js')
const Service= require('./models/service.js')
const Emp= require('./models/employee.js')

connectToDB()

async function seedDB(){
    try{ 
        await Salon.deleteMany({});
        await Category.deleteMany({});
        await Service.deleteMany({})
        await Emp.deleteMany({})


    const createdSalons = await Salon.insertMany([
        {
          name: "Aroma Beauty Lounge" ,
          address: "752, Saar area 507",
          about:" About Us: Aroma Beauty Lounge & Spa is a premium beauty and wellness salon located in Saar, Bahrain. We offer a wide range of services, including hair, nails, lashes, massage, Moroccan baths, and spa treatments. Our mission is to provide a relaxing, luxurious experience with professional care, high-quality products, and personalized service, helping every client feel confident and beautiful. Working Hours: 12AM - 9PM ",
          salon_URL: "/images/1-aroma-header.jpeg" 
        },
        {
            name: "blossom district beauty salon",
            about:"A salon specializing in nails and massage, in addition to eyelashes, lightening and tinting of eyelashes and eyebrows, skin cleaning, body scrubs and henna. Working Hours: 1PM - 9:00PM",
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

const insertEmployees = await Emp.insertMany([
    {
        name: "Mila Cruz",
        speciality: "Nail Artist - 10 years expert in nails art",
        salon_id: createdSalons[0]._id,
         rate: 5,
        availability: generateAvailability(12,21)
        
    },
    {
        name: "Amara Diallo",
        speciality: "Senior Stylist: Hair cut and luxury styling",
        salon_id: createdSalons[0]._id,
        rate: 5 ,
        availability: generateAvailability(12,21)
                 

    },
    {
        name: "Julia Dubois",
        speciality: "Full service specialist",
        salon_id: createdSalons[0]._id ,
        rate: 4,
        availability: generateAvailability(12,21)
                 
    },
    {
        name: "Luna Vane",
        speciality: "Master in hair extentions, Stylist, Colorist",
        salon_id: createdSalons[1]._id ,
        rate: 5,
        availability: generateAvailability(13,21)
                 
    },
    {
        name: "Anaya R.",
        speciality: "Mani & Pedi care",
        salon_id: createdSalons[1]._id ,
        rate: 4.5,
        availability: generateAvailability(13,21)
                
    },
    {
        name: 'Malleka',
        speciality: "Message specialist",
        salon_id: createdSalons[1]._id ,
        rate: 5,
        availability: generateAvailability(13,21)         
    }

])
function generateAvailability(startHour, endHour) { 

    const slots = []; 

    const today = new Date(); 

    today.setHours(startHour, 0, 0, 0); 

    while (today.getHours() < endHour) 

        slots.push({ 
            time: new Date(today),
            isBooked: false
        });

        today.setMinutes(today.getMinutes() + 30); 
    }

    return slots;
}


}catch(err){
    console.error("Seeding error:", err);
}




seedDB()