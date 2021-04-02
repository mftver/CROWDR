class WeatherApiService {
  constructor() {
    this.Update();
    setInterval(this.Update, 60000);
  }

  // eslint-disable-next-line class-methods-use-this
  Update() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Den Bosch,NL&APPID=fc24cd69b564813ec6a99ab022992c76';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.dispatchEvent(new CustomEvent('weatherupdate', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new WeatherApiService();
