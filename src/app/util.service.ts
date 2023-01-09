import { Injectable } from '@angular/core';
import { CalcificationCosts, GenSpeedCosts, MetallicCosts } from "./upgrade-costs";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  gen_speed_cost(val: number) {
    return GenSpeedCosts.for(val)
  }

  calcify_luck_cost(val: number) {
    return CalcificationCosts.for(val)
  }

  met_luck_cost(val: number) {
    return MetallicCosts.for(val)
  }
}
