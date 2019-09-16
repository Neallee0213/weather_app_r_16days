import React from 'react'
import "./weather_hourly.css"

const WeatherHourly = (props) => {
    let weathers = props.weathers.map(weather => {
        
        let date = weather.dt_txt.slice(0,10).split("-").join("/");
        let time = weather.dt_txt.slice(11,-3);
        let timeRewrote= ""
        if (time === "00:00"){
            timeRewrote = "12:00 AM";
        }else{
            timeRewrote = "12:00 PM";
        }

        if (time === "00:00" || time ===  "12:00" ){
            
            return (
                
                <div className="col-6 col-sm-3 col-lg-2 days-weather" key ={weather.dt} >
                            <p>{date}</p>
                            <p>{timeRewrote}</p>
                            <i className={`wi ${props.weatherIcon} display-3`}></i>
                            <h3>{tempRoundUp(weather.main.temp)}&deg;</h3>
                            <p>Min : {tempRoundUp(weather.main.temp_min)}&deg;</p>
                            <p>Min : {tempRoundUp(weather.main.temp_max)}&deg;</p>
                            
                            <h5>{weather.weather[0].description.toUpperCase()}</h5>
                            
                        </div>
                    
                    
                    
                    )
                    
        }else{
            return null
        }
            })
            
            
            return (
        <div className="container">
            <div className="row">
                {weathers}
            </div>
        </div>
    )
}
const tempRoundUp = (temp)=> {
    let num = Math.round(temp)
    return num;
  }


export default WeatherHourly
