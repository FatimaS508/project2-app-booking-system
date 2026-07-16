const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs', { user: req.session.user })
})

module.exports = router;
