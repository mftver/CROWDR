// Based on https://medium.com/javascript-by-doing/create-a-modern-javascript-router-805fc14d084d

export default class Router {
  routes = [];

  root = '/';

  constructor() {
    this.listen();
  }

  add(path, callback) {
    this.routes.push({ path, callback });
    return this;
  }

  clearSlashes = (path) => path
    .toString()
    .replace(/\/$/, '')
    .replace(/^\//, '');

  getFragment() {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);
    fragment = match ? match[1] : '';

    return this.clearSlashes(fragment);
  }

  navigate(path = '') {
    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    return this;
  }

  listen() {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  }

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some((route) => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.callback.apply({}, match);
        return match;
      }
      return false;
    });
  }
}
