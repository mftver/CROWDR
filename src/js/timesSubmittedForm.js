class TimesFormSubmitted {
  times;

  maxFormSteps = 8;

  constructor() {
    this.times = 1;
  }

  getTimes() {
    return this.times;
  }

  addTimes() {
    if (this.getTimes() !== this.maxFormSteps) {
      this.times += 1;
    }
  }
}

export default new TimesFormSubmitted();
