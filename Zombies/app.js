var http = require('http');
var path = require('path');
var express= require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();//inicialización de la App

app.use(express.static(path.resolve(__dirname,"public")));//tomar los recursos como las fotos en este caso
app.set('views',path.resolve(__dirname, 'views'));//acceso a carpeta vistas (documentos .ejs)
app.set('view engine','ejs');//para usar plantillas como <%  %>

var entries=[];//arreglo guardar los valores de formularo 
app.locals.entries=entries;////guarda los valores de las variables locales
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));//analiza el texto como datos URL codificados (formularios)

app.get("/", (request,response)=> response.render('index'));// al iniciar localhost:3000 se inicia en 'index'

var IP_VALIDAS = ['192.168.10.8','192.168.10.3','::1','192.168.10.5']; //IPs que son válidas para acceder a la sección Víctimas 
var IP_ESTADOL=false;
var IP_ACTUALL="192.168.10.4"; //ip actual, en este caso, esta IP no pertenece a IP_VALIDAS, es por eso que arrojará una excepción al acceder a la sección de víctimas
app.get("/victimas",(request,response)=>{ //se mande llamar la sección víctimas
    for(var i=0; i<IP_VALIDAS.length; i++){//condición for para recorrer el arreglo de Ip's 
        if(IP_ACTUALL==IP_VALIDAS[i]){ //condición para saber si IP_ACTUAL es igual a las IPs del arreglo
            IP_ESTADOL=true;//si la condicion anterior se cumple, entonces IP_ESTADO cambia a verdadero
        }
    }if(IP_ESTADOL){ //condicion si IP_ESTADO se cumple entonces se entra a la condición.
        response.render('victimas'); //manda llamar a la sección victimas
            next();//continua con el resto de código fuera de app.get("victimas...
        }else{//de lo contrario
            response.status(401).render('401');//arroja un mensaje de errro 401 (es una sección .ejs)
        }    
}); 

app.post("/victimas",(request,response)=>{ //al acceder a la sección víctimas, pasa a la ejecución del llenado de formulario en caso de requerir algun dato de la sección, esta lo carga del servidor
    if(!request.body.name || !request.body.address || !request.body.phone || !request.body.instagram){//condición para verificar que todos lo campos esten llenados conrrectamente
        response.status(400).send("las entradas deben tener nombre, direccion, telefono e instagram");//en caso contrario a lo anterior, aparece un mensaje de error
        return;//regresa para realizar el llenado de nuevo
            }
            entries.push({//en caso de un correcto llenado de campos, con la función push, se envían 
                name: request.body.name, 
                address: request.body.address,
                phone: request.body.phone,
                instagram: request.body.instagram,
                created: new Date()
            });
            response.redirect('victimas');  //al terminar el llenado, redireccionar a la sección víctimas
        });     

app.get("/clases",(request,response)=>response.render("clases"));//get para cuando se manda llamar la sección clases
app.post("/clases",(request,response)=>{ //en caso de requerir algun dato de la sección, esta lo carga del servidor
    response.redirect('/');//al responder, este redirecciona al index
});

app.get("/armas",(request,response)=>response.render("armas"));
app.post("/armas",(request,response)=>{
    response.redirect('/');
});

app.use((request,response)=> response.status(404).render('404')); //en caso de algun error 404, se muestra en patalla para el usaurio
http.createServer(app).listen(3000,()=> //se crea el serividor por el puerto 3000
console.log("La aplicaion Zombies esta corriendo en el puerto 3000"));

