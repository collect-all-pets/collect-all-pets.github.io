import { Egg } from "./egg.enum";
import { UserStats } from "./user-stats";

export class HatchInfo {
  gen_egg: Egg | null = null
  gen_egg2: Egg | null = null
  hatch_egg: Egg | null = null
  hatch_egg2: Egg | null = null
  should_gen: boolean = false
  should_gen2: boolean = false
  should_hatch: boolean = false
  should_hatch2: boolean = false
  gen2_pct: number | null = null
  hatch2_pct: number | null = null
  gen_duty_pct: number = 100
  hatch_duty_pct: number = 100
  // gen_always_active: boolean = true
  // hatch_always_active: boolean = true

  assign(info: HatchInfo) {
    if (info == null) {
      return
    }
    Object.assign(this, info)
  }
  clone(): HatchInfo {
    return Object.assign(new HatchInfo(), this)
  }

  is_enabled(stats: UserStats) {
    return (this.should_gen && this.gen_egg !== null && stats.gen_spd !== null) || (this.should_hatch && this.hatch_egg !== null && stats.auto_hatch_speed !== null)
  }
}

