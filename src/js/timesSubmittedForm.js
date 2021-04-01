class TimesFormSubmitted {
  times;

  maxFormSteps = 8;

  constructor() {
    this.times = 1;
  }

  getTimes() {
    return this.times;
  }

  resetTimesSubmitted() {
    this.times = 1;
  }

  addTimes() {
    if (this.getTimes() !== this.maxFormSteps) {
      this.times += 1;
    }
  }
}

export default new TimesFormSubmitted();
