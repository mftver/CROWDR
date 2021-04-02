export default class WeatherShowcase extends HTMLElement {
  constructor() {
    super();
    document.addEventListener('weatherupdate', (e) => this.Update(e.detail));
  }

  // eslint-disable-next-line class-methods-use-this
  Update(e) {
    this.innerHTML = '';
    const img = new Image(50, 50);
    img.src = `https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`;
    this.appendChild(img);
  }
}
