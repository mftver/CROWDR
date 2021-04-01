// Based on https://medium.com/@thevirtuoid/enums-in-javascript-e3f1be4a3cb5
export default class Enum {
  constructor(...properties) {
    properties.forEach((prop) => {
      Object.defineProperty(this, prop, {
        get: () => prop,
      });
    }, this);
    Object.freeze(this);
  }
}
