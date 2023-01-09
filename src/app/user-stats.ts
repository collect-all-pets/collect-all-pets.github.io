import { CalcificationCosts, GenSpeedCosts, MetallicCosts, ShinyLuckCosts } from "./upgrade-costs";
import { Constants } from "./constants";
import { Egg } from "./egg.enum";
import { Statistics } from "./stats";

export class UserStats {
  egg_luck_pct: number | null = null
  egg_badge_luck_pct: number | null = null
  fuse_luck_pct: number | null = null
  shiny_wall_luck: number | null = null
  shiny_badge_luck: number | null = null
  metallic_luck_pct: number | null = null
  metallic_badge_luck: number | null = null
  calcify_luck_pct: number | null = null
  gen_spd: number | null = null
  cheaper_eggs: boolean = false
  even_cheaper: boolean = false
  expert_luck: boolean = false
  pet_score: number | null = null
  discovery_luck_pct: number | null = null
  extra_discovery_luck_pct: number | null = null

  polished_metal: boolean = false
  wall_damage_pct: number | null = null
  badge_damage_pct: number | null = null

  ec_luck_pct: number | null = null
  ec_badge_luck_pct: number | null = null
  magnetosphere: boolean = false
  met_score: number | null = null

  auto_hatch_speed: number | null = 0.9  // todo: how to make the default value for this obvious?

  titanium_pets: number[] = [0,0,0,0,0,0,0,0]

  assign(stats: UserStats) {
    if (stats == null) {
      return
    }
    Object.assign(this, stats)
  }
  clone(): UserStats {
    return Object.assign(new UserStats(), this)
  }

  damage_multiplier(): number {
    return 1 + ((this.wall_damage_pct! + this.badge_damage_pct!) / 100)
  }

  fuse_luck(): number {
    return this.fuse_luck_pct! / 100.0
  }

  egg_luck(): number {
    return (this.egg_luck_pct! + this.egg_badge_luck_pct!) / 100.0
  }

  discovery_luck(): number {
    return (this.discovery_luck_pct! + this.extra_discovery_luck_pct!) / 100.0
  }

  ec_luck(): number {
    let pct = (this.ec_luck_pct! + this.ec_badge_luck_pct!)
    if (this.magnetosphere) {
      pct *= (1 + (this.met_score! / 100.0))
    }
    return pct / 100.0
  }

  shiny_luck(): number {
    let pet_score_luck = 1 + (this.expert_luck ? this.pet_score!/10000000.0 : 0)
    return (1/1000.0) * this.shiny_wall_luck! * this.shiny_badge_luck! * pet_score_luck
  }

  metallic_luck(): number {
    return (this.metallic_luck_pct! * this.metallic_badge_luck!) / 100.0
  }

  metallic_upgrades(): number {
    return this.metallic_luck_pct! * 100000
  }

  stone_luck(): number {
    return this.calcify_luck_pct! / 100.0
  }

  next_metallic_cost(): number {
    return MetallicCosts.next(this.metallic_upgrades())
  }

  next_calcify_cost(): number {
    return CalcificationCosts.next(this.calcify_luck_pct!)
  }

  next_gen_speed_cost(): number {
    return GenSpeedCosts.next(this.gen_spd!)
  }

  next_shiny_luck_cost(): number {
    return ShinyLuckCosts.next(this.shiny_wall_luck!)
  }

  increase_metallic_luck(by: number = Constants.metallicLuckIncrease) {
    this.metallic_luck_pct! += by
    if (this.metallic_luck_pct! >= Constants.maxMetallicLuck) {
      this.metallic_luck_pct = Constants.maxMetallicLuck
    }
  }

  increase_metallic_badge_luck(by: number = Constants.metallicBadgeIncrease) {
    this.metallic_badge_luck! += by
    if (this.metallic_badge_luck! >= Constants.maxMetallicBadge) {
      this.metallic_badge_luck = Constants.maxMetallicBadge
    }
  }

  increase_shiny_badge_luck(by: number = Constants.shinyBadgeIncrease) {
    this.shiny_badge_luck! += by
    if (this.shiny_badge_luck! >= Constants.maxShinyBadgeLuck) {
      this.shiny_badge_luck = Constants.maxShinyBadgeLuck
    }
  }

  increase_calcify_luck(by: number = Constants.calcifyIncrease) {
    this.calcify_luck_pct! += by
    if (this.calcify_luck_pct! >= Constants.maxCalcify) {
      this.calcify_luck_pct = Constants.maxCalcify
    }
  }

  increase_gen_speed(by: number = Constants.genSpeedIncrease) {
    this.gen_spd! += by
    if (this.gen_spd! >= Constants.maxGenSpeed) {
      this.gen_spd = Constants.maxGenSpeed
    }
  }

  increase_shiny_luck(by: number = Constants.shinyLuckIncrease) {
    this.shiny_wall_luck! += by
    if (this.shiny_wall_luck! >= Constants.maxShinyWallLuck) {
      this.shiny_wall_luck = Constants.maxShinyWallLuck
    }
  }

  is_max_gen_spd(): boolean {
    return this.gen_spd! >= Constants.maxGenSpeed
  }
  is_max_met_luck(): boolean {
    return this.metallic_upgrades() >= Constants.maxMetallicUpgrades
  }
  is_max_met_badge(): boolean {
    return this.metallic_badge_luck! >= Constants.maxMetallicBadge
  }
  is_max_calcify_luck(): boolean {
    return this.calcify_luck_pct! >= Constants.maxCalcify
  }
  is_max_shiny(): boolean {
    return this.shiny_wall_luck! >= Constants.maxShinyWallLuck
  }
  is_max_shiny_badge(): boolean {
    return this.shiny_badge_luck! >= Constants.maxShinyBadgeLuck
  }
  is_max_all_3(): boolean {
    return this.is_max_met_luck() && this.is_max_gen_spd() && this.is_max_calcify_luck()
  }
  is_metallic_possible() {
    return this.metallic_luck_pct != null && this.metallic_luck_pct > 0 && this.metallic_badge_luck != null && this.metallic_badge_luck > 0
  }
  has_any_upgrades_left() {
    return !(this.is_max_all_3() && this.is_max_shiny())
  }

  can_upgrade() {
    return (this.calcify_luck_pct != null && !this.is_max_calcify_luck()) ||
      (this.metallic_luck_pct != null && !this.is_max_met_luck()) ||
      (this.gen_spd != null && !this.is_max_gen_spd())
  }

  // returns the amount of eggs required to receive a probability of X
  eggs_for_metallic_pct(pct: number): number {
    return Math.log(1-(pct/100.0)) / Math.log(1 - this.metallic_luck())
  }

  // returns the amount of eggs required to receive a probability of X
  eggs_for_shiny_pct(pct: number): number {
    return Math.log(1-(pct/100.0)) / Math.log(1 - this.shiny_luck())
  }

  chance_of_metallic_pct_for(hatches: number): number {
    let wontHappen = 1 - this.metallic_luck() // chance you won't get a metallic this egg
    let stillWontHappen = Math.pow(wontHappen, hatches) // chances you won't get a metallic over any egg
    let willHappen = 1 - stillWontHappen // chances you will get at least 1 metallic
    return willHappen * 100  // in percent
  }

  chance_of_metallic_pct_for_egg(egg: Egg, hatches: number): number {
    let wontHappen = 1 - this.metallic_luck_for_egg(egg) // chance you won't get a metallic this egg
    let stillWontHappen = Math.pow(wontHappen, hatches) // chances you won't get a metallic over any egg
    let willHappen = 1 - stillWontHappen // chances you will get at least 1 metallic
    return willHappen * 100  // in percent
  }

  metallic_luck_for_egg(egg: Egg): number {
    return this.metallic_luck() * ((Egg.unique(egg) - this.titanium_pets[egg]) / Egg.unique(egg))
  }

  // returns the binomial probability of X successes when hatching Y pets
  metallic_binomial_probability_for(successes: number, eggs: number): number {
    return Statistics.binomialProbabilityMass(successes, eggs, this.metallic_luck())
  }

  has_titanium_pets(): boolean {
    for (let x of this.titanium_pets) {
      if (x > 0) {
        return true
      }
    }
    return false
  }


}
