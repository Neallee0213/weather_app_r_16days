import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from "./components/weather"
import WeatherHourly from "./components/weather_hourly"
import "weather-icons/css/weather-icons.css"
import Form from "./components/form"

const API_KEY = "54a329d1bcf2001a542b94c9c9ace8a2";

export default class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    icon: undefined,
    main: undefined,
    temperature: undefined,
    temp_max: undefined,
    temp_min: undefined,
    humidity: undefined,
    wind: undefined,
    description: "",
    error: false,
    weathers: []
  }

  tempRoundUp(temp) {
    let num = Math.round(temp)
    return num;
  }

  weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const weather_api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const res = await weather_api_call.json();
      this.setState({
        weathers: res.list
      })
      const weather_day_api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await weather_day_api_call.json();
      this.setState({
        city: `${res.city.name}, ${res.city.country}`,
        temperature: this.tempRoundUp(data.main.temp),
        temp_max: this.tempRoundUp(data.main.temp_max),
        temp_min: this.tempRoundUp(data.main.temp_min),
        humidity: this.tempRoundUp(data.main.humidity),
        wind: this.tempRoundUp(data.wind.speed),
        description: data.weather[0].description,
        error: false,
        weathers: res.list
      })
      this.get_WeatherIcon(this.weatherIcon, data.weather[0].id);

      console.log(res)
    }
    else {
      this.setState({ error: true })
    }


  }
  render() {

    return (
      <div className="App">
        <Form
          loadweather={this.getWeather}
          error={this.state.error}
        />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          humidity ={this.state.humidity}
          wind ={this.state.wind}

        />
        <WeatherHourly
          weatherIcon={this.state.icon}
          weathers={this.state.weathers}
        />
      </div>
    )
  }
}