var http = require('http');
var path = require('path');
var express= require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.resolve(__dirname,"public")));
app.set('views',path.resolve(__dirname, 'views'));
app.set('view engine','ejs');

var entries=[];
app.locals.entries=entries;
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.get("/", (request,response)=> response.render('index'));


app.get("/victimas",(request,response)=>response.render("victimas"));
app.post("/victimas",(request,response)=>{
    if(!request.body.name || !request.body.address || !request.body.phone || !request.body.instagram){
       response.status(400).send("las entradas deben tener nombre, direccion, telefono e instagram");
        return;
    }
    entries.push({
        name: request.body.name,
        address: request.body.address,
        phone: request.body.phone,
        instagram: request.body.instagram,
        created: new Date()
    });
    response.redirect('victimas');

});

app.get("/clases",(request,response)=>response.render("clases"));
app.post("/clases",(request,response)=>{
    response.redirect('/');
});

app.get("/armas",(request,response)=>response.render("armas"));
app.post("/armas",(request,response)=>{
    response.redirect('/');
});

//app.get("/index",(request,response)=>response.render("index"));
//app.post("/index",(request,response)=>{
  //  response.redirect('/');
//});


app.use((request,response)=> response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log("La aplicaion Zombies esta corriendo en el puerto 3000"));

