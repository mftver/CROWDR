import html from './weather-showcase.html';
import WeatherApiService from '../../js/weather-api-service'

export default class WeatherShowcase extends HTMLElement {
  constructor() {
    super();
    document.addEventListener('weatherupdate', (e) => this.Update(e.detail));
  }

  connectedCallback() {
    this.innerHTML = html;

    this.addEventListener('click', (e) => {
      const weatherType = e.target.getAttribute('data-type');
      WeatherApiService.UpdateWeather(weatherType);
    });
  }

  Update(weatherType) {
    this.querySelector('img').remove();
    const img = new Image(50, 50);
    if (weatherType === 'sunny') {
      img.src = 'https://openweathermap.org/img/wn/01d@2x.png';
    } else {
      img.src = 'https://openweathermap.org/img/wn/09d@2x.png';
    }
    this.appendChild(img);
  }
}
