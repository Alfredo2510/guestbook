var express= require("express");
var Zombie= require("./models/zombie");
var Equipment = require("./models/equipment");

var passport=require("passport");
var router= express.Router();

router.use((req,res,next)=>{
    res.locals.currentZombie=req.Zombie;
    res.locals.errors=req.flash("error");
    res.locals.infos=req.flash("info");
    next();
});


router.get("/signup", (req, res, next)=>{
    res.render("signup");
});

router.post("/signup", (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({username: username}, (err, zombie)=>{
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error", "El nombre de usuario ya lo ha usado otro zombie");
            return res.redirect("/signup");
        }
            var newZombie = new Zombie({
                username: username,
                password: password
            });
            newZombie.save(next);
            return res.redirect("/");
    });
;})

router.get("/",(req,res,next)=>{
    Zombie.find()
        .sort({createdAt:"descending"})
        .exec((err,zombies)=>{
            if(err){
                return next(err);
            }
            res.render("index",{zombies:zombies});
        });
});
    
router.get("/zombies/:username", (req, res, next)=>{
    Zombie.findOne({username: req.params.username}, (err, zombie)=>{
        if(err){
            return next(err);
        }
        if(!zombie){
            return next(400);
        }
        res.render("profile", {zombie: zombie});
    });
});

router.get("/equip", (req,res,next)=>{
    res.render("equip");
});

router.post("/equip", (req, res, next)=>{
    var description = req.body.description;
    var defense = req.body.defense;
    var category = req.body.category;
    var weight = req.body.weight;

    Equipment.findOne((err)=>{
        
        var newEquip = new Equipment({
            description: description,
            defense: defense,
            category: category,
            weight: weight
        });
        newEquip.save(next);
        return res.redirect("/equipment");
    });
});

router.get("/Equipment", (req, res, next)=>{
    Equipment.find()
    .exec((err, equipo)=>{
        if(err)
        {
            return next(err);
        }
        res.render("zombieEq", {equipo: equipo});
    });

});

module.exports=router;

///