class WeatherApiService {
  constructor() {
    this.Update();
    setInterval(this.Update, 60000);
  }

  WeatherType = 'sunny';

  // eslint-disable-next-line class-methods-use-this
  Update() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Den Bosch,NL&APPID=fc24cd69b564813ec6a99ab022992c76';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.weather[0].id >= 800) {
          this.UpdateWeather('sunny');
        } else {
          this.UpdateWeather('rainy');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  UpdateWeather(weatherType) {
    this.weatherType = weatherType;
    document.dispatchEvent(new CustomEvent('weatherupdate', {
      detail: weatherType,
    }));
  }
}

export default new WeatherApiService();
