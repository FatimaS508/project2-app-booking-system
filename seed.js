const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const connectToDB = require('./db.js')
const Salon = require('./models/salons.js')

connectToDB()

async function seedDB(){
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
console.log('Database seeded successfully')
}
seedDB()