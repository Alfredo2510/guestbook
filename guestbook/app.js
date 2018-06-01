var http= require('http');
var path= require('path');
var express= require('express');
var logger = require ('morgan'); //registrar detalles
var bodyParser =require('body-parser');//lee la entrada de un formulario y la almacena como un javascript (middleware)


//.set almacena valores
var app= express(); //inicializa la app
app.set('views',path.resolve(__dirname, 'views'));//busca todos los archivos de la carpeta y los almancena
app.set('view engine','ejs');//para usar plantillas como <%  %>
var entries=[];//arreglo para ingresar titulo y mensaje
app.locals.entries=entries;//guarda los valores de las variables

app.use(logger('dev'));//identifica el estado de la respuesta con un color
app.use(bodyParser.urlencoded({extended: false}));//analiza el texto como datos URL codificados (formularios)
app.get("/", (request,response)=> response.render('index'));


app.get("/new-entry",(request,response)=>response.render("new-entry"));
app.post("/new-entry",(request,response)=>{
    if(!request.body.title ||!request.body.body){
        response.status(400).send("Las entradas deben de tener un titulo y un mensaje");
        return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });
    response.redirect('/');
});


app.use((request,response)=> response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log("La aplicaion Guestbook esta corriendo ene l puerto 3000"));