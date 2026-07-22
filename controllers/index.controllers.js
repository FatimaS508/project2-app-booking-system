const router = require("express").Router()


router.get('/',(req,res)=>{
    try{
    res.render('homepage.ejs', { user: req.session.user })
    }catch(err){console.log(err)}
})

module.exports = router;
