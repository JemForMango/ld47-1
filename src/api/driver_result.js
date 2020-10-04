class DriverResult {
  constructor(index, trackName) {
    this._index = index;
    this._trackName = trackName;
    this._name = null;
    this._lapTimes = [];
    this._crashCount = 0;
    this._startTime = 0;
    this._lapStartTime = 0;
  }

  set startTime(startTime) {
    this._startTime = startTime;
    this._lapStartTime = startTime;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    if (this._name) {
      return this._name;
    }
    return `Player ${this._index + 1}`;
  }

  get trackName() {
    return this._trackName;
  }

  get index() {
    return this._index;
  }

  get lapCount() {
    return this._lapTimes.length;
  }

  get lapTimes() {
    return [...this._lapTimes];
  }

  get crashCount() {
    return this._crashCount;
  }

  get currentLapElapsed() {
    const now = Date.now();
    return now - this._lapStartTime;
  }

  get bestLap() {
    return Math.min(...this._lapTimes);
  }

  startLap() {
    const now = Date.now();
    this._lapTimes.push(now - this._lapStartTime);
    this._lapStartTime = now;
  }

  crashed() {
    this._crashCount += 1;
  }

  toJson() {
    const data = {
      index: this._index,
      player_name: this._name,
      crash_count: this._crashCount,
      lap_times: this._lapTimes,
      track_name: this._trackName,
    };
    return JSON.stringify(data);
  }

  static fromJson(jsonData) {
    /* eslint-disable no-underscore-dangle */
    let data = jsonData;
    if (typeof data === 'string' || data instanceof String) {
      data = JSON.parse(jsonData);
    }
    const ret = new DriverResult(data.index);
    ret.name = data.player_name;
    ret._trackName = data.track_name;
    ret._crashCount = data.crash_count;
    ret._lapTimes = data.lap_times;
    return ret;
  }
}

module.exports = { DriverResult };
