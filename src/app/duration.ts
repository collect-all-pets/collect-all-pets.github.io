export class Duration {
  days: number | null = 0
  hours: number | null = 0
  minutes: number | null = 0
  seconds: number | null = 0

  assign(dur: Duration) {
    if (dur == null) {
      return
    }
    Object.assign(this, dur)
  }
  clone(): Duration {
    return Object.assign(new Duration(), this)
  }

  static for(days: number, hours: number, minutes: number, seconds: number): Duration {
    let dur = new Duration()
    dur.days = days
    dur.hours = hours
    dur.minutes = minutes
    dur.seconds = seconds
    return dur
  }
  static from_seconds(seconds: number): Duration {
    let dur = new Duration()
    dur.seconds = seconds
    return dur
  }
  static from_minutes(minutes: number): Duration {
    let dur = new Duration()
    dur.minutes = minutes
    return dur
  }
  static from_hours(hours: number): Duration {
    let dur = new Duration()
    dur.hours = hours
    return dur
  }
  static from_days(days: number): Duration {
    let dur = new Duration()
    dur.days = days
    return dur
  }

  total_seconds() {
    return this.days! * 86400 + this.hours! * 3600 + this.minutes! * 60 + this.seconds!
  }
  total_hours() {
    return this.days! * 24 + this.hours! + (this.minutes! / 60.0) + (this.seconds! / 3600.0)
  }
  total_days() {
    return this.days! + (this.hours! / 24.0) + (this.minutes! / 1440.0)  + (this.seconds! / 86400.0)
  }

  toString() {
    let res = ''
    if (this.days! > 0) {
      res += this.days + ' days '
    }
    if (this.hours! > 0) {
      res += this.hours + ' hours '
    }
    if (this.minutes! > 0) {
      res += this.minutes + ' min '
    }
    if (this.seconds! > 0) {
      res += this.seconds + ' sec '
    }
    return res.trimEnd()
  }
}
