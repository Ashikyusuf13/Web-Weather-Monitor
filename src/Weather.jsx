import { useState } from "react";
import cloud from "./assets/cloud.png";
import humidity from "./assets/humidity.png";
import searchicon from "./assets/search-icon.png";
import rainy from "./assets/rainy.jpg";
import sunny from "./assets/sunny.jpg";
import wind from "./assets/wind.jpg";
import snow from "./assets/snow.jpg";
import "./Weather.css";

// Online fallback images
const onlineImages = {
  cloud: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  sunny: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  rainy: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  humidity: "https://cdn-icons-png.flaticon.com/512/728/728093.png",
  wind: "https://cdn-icons-png.flaticon.com/512/1116/1116453.png",
};

const Weatherdeatils = ({
  icon,
  degree,
  city,
  country,
  lat,
  long,
  humidityimg,
  humiditycor,
  windimg,
  windcor,
}) => {
  // Placeholder image generator
  const placeholder = (label) =>
    `https://placehold.co/130x130?text=${encodeURIComponent(label)}`;
  return (
    <>
      <div className="details-weather">
        <img
          src={icon}
          id="image"
          alt="cloud image"
          onError={(e) => (e.currentTarget.src = onlineImages.cloud)}
        />
        <div className="degree">{degree}C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>

        <div className="cord">
          <div>
            <span className="lat">Latitide</span>
            <span> {lat}</span>
          </div>

          <div>
            <span className="lat">Longititude</span>
            <span> {long}</span>
          </div>
        </div>

        <div className="hum-wind">
          <div className="humidity">
            <img
              src={humidityimg}
              id="image"
              alt="humidity image"
              onError={(e) => (e.currentTarget.src = onlineImages.humidity)}
            />
            <div className="coor-humidity">
              <span>{humiditycor}%</span>
              <span>Humidity</span>
            </div>
          </div>

          <div className="Wind">
            <img
              src={windimg}
              id="imagey"
              alt="wind image"
              onError={(e) => (e.currentTarget.src = onlineImages.wind)}
            />
            <div className="coor-humidity">
              <span>{windcor}Km/hr</span>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Weather() {
  const [text, setText] = useState("Madurai");

  // Use online images as fallback if local images are missing
  const [icon, setIcon] = useState(cloud || onlineImages.cloud);
  const [degree, setDegree] = useState(33);
  const [city, setCity] = useState("Madurai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(11);
  const [long, setlong] = useState(75);
  const [humidityimg, setHumidityimg] = useState(
    humidity || onlineImages.humidity
  );
  const [humiditycor, setHumiditycor] = useState(31);
  const [windcor, setWindcor] = useState(1.54);
  const [windimg, setWindimg] = useState(wind || onlineImages.wind);
  let Api_key = "c35eda8383c157bac8fdc6f3e1f6f6bb";

  const weatherimg = {
    "01d": sunny || onlineImages.sunny,
    "02d": cloud || onlineImages.cloud,
    "03d": cloud || onlineImages.cloud,
    "04d": cloud || onlineImages.cloud,
    "09d": rainy || onlineImages.rainy,
    "10d": rainy || onlineImages.rainy,
    "11d": rainy || onlineImages.rainy,
    "13d": snow || onlineImages.snow,
    "01n": sunny || onlineImages.sunny,
    "02n": cloud || onlineImages.cloud,
    "13n": snow || onlineImages.snow,
    "50d": cloud || onlineImages.cloud,
  };

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${Api_key}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === "404") {
        alert("city is not found");
      }
      setHumiditycor(data.main.humidity);
      setWindcor(data.wind.speed);
      setDegree(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setlong(data.coord.lon);
      const weatherimg = data.weather[0].icon;
      setIcon(weatherimg || cloud);
    } catch (err) {
      console.log("error in the api:", err);
    }
  };
  function handlechange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <div className="weather-container">
        <div className="input-container">
          <input
            type="text"
            name="text"
            value={text}
            onChange={handlechange}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter the city name"
          />

          <img
            src={searchicon}
            className="search-icon"
            alt="search icon"
            onClick={() => search()}
          />
        </div>

        <Weatherdeatils
          icon={icon}
          degree={degree}
          city={city}
          country={country}
          lat={lat}
          long={long}
          humidityimg={humidity}
          humiditycor={humiditycor}
          windimg={windimg}
          windcor={windcor}
        />
      </div>
    </>
  );
}

export default Weather;
