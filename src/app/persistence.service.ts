import { Injectable } from '@angular/core';
import { UserStats } from "./user-stats";
import { HatchInfo } from "./hatch-info";
import { Duration } from "./duration";
import { UserConfig } from "./user-config";
import { PetsConfig } from "./pets-config";

const userStatsKey = 'user-stats'
const durationKey = 'duration'
const hatchInfoKey = 'hatch-info'
const userConfigKey = 'user-config'
const petsConfigKey = 'pets-config'

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  get(key: string): any {
    try {
      let val = localStorage.getItem(key)
      return val == null ? null : JSON.parse(val)
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }

  persist(stats: UserStats, dur: Duration, info: HatchInfo, cfg: UserConfig, pets: PetsConfig) {
    this.set(userStatsKey, stats)
    this.set(durationKey, dur)
    this.set(hatchInfoKey, info)
    this.set(userConfigKey, cfg)
    this.set(petsConfigKey, pets)
  }

  restore(stats: UserStats, dur: Duration, info: HatchInfo, cfg: UserConfig, pets: PetsConfig) {
    stats.assign(this.get(userStatsKey))
    dur.assign(this.get(durationKey))
    info.assign(this.get(hatchInfoKey))
    cfg.assign(this.get(userConfigKey))
    pets.assign(this.get(petsConfigKey))
  }
}
