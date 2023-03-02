const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html")
    

  
    
    
})

app.post("/",function (req,res) {
    const query=req.body.cityName
    const weatherLink="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=4e4e90b1434c28ffe1f9f70e11d498fc#"
    

    https.get(weatherLink,function (response) {

        console.log(response.statusCode);
        
        
        response.on("data",function (data) {

            const weatherData=JSON.parse(data)
            var temp=weatherData.main.temp
            
            
            var description=weatherData.weather[0].description
            var icon=weatherData.weather[0].icon
            var iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
           
            console.log(description);
            res.write("<img src="+iconUrl+ "/>")
            res.write("The Weather in "+query+" Is Currently "+temp +" Degrees Celcius");
            res.send();
            
        })
    })
    
    
})

  
app.listen(3000,function () 
{
    console.log("server 3k started");
})