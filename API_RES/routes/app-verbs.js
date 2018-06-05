var api = express.Router();

app.get("/",(req,res)=>{
    res.send("Utilizaste el verbo GET");
});

app.post("/",(req,res)=>{
    res.send("Utilizaste el verbo POST");
});

app.put("/",(req,res)=>{
    res.send("Utilizaste el verbo PUT");
});

app.delete("/",(req,res)=>{
    res.send("Utilizaste el verbo DELETE");
});

module.exports=api;