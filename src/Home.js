import React, {useState } from "react";
import axios from "axios";
import './style.css';
import  search from './img/search.png';
import cloud from "./img/meteo.png";
import vent from "./img/vent.png";
import fog from "./img/fog.png";
import clear from "./img/sunny.png";
import rain from "./img/jour-de-pluie.png"
import driz from "./img/cloudy.png";

function Home() {
    const [data, setdata] = useState({
        celcius: 30,
        name: 'Bamako',
        humidity: 74,
        speed: 5.14,
        image: ''
    })

    const [name, setName] = useState("");
    const [err, setErr] = useState("");

    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=6d1a94f4e5d0b08453337313f5d32997&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if (res.data.weather[0].main === "Clouds") {
                  imagePath = cloud;
                } else if (res.data.weather[0].main === "Clear") {
                   imagePath = clear;
                } else if (res.data.weather[0].main === "Rain") {
                   imagePath = rain;
                } else if (res.data.weather[0].main === "Drizzle") {
                   imagePath = driz;
                } else if (res.data.weather[0].main === "Mist") {
                    imagePath = fog;
                } else {
                   imagePath = driz;
                }
                console.log(res.data);
                setdata({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath});
                setErr('');
            })
            .catch(err => {
                if(err.response.status == 404){
                    setErr("invalid city name")
                } else{
                    setErr('');
                }
                console.log(err)
            })
        }
    }
  return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder="Enter city name" onChange={e =>setName(e.target.value)}/>
                <button type="submit" onClick={handleClick}>
                    <img src={search} alt=""/>
                </button>
            </div>
            <div className="error">
                <p>{err}</p>
            </div>
            <div className="winfo">
                <img src={data.image} alt=""/>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img  src={fog}/>
                        <div className="humidity">
                           <p>{Math.round(data.humidity)}</p>
                           <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                       <img  src={vent}/>
                       <div className="wind">
                           <p>{Math.round(data.speed)}km/h</p>
                           <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;