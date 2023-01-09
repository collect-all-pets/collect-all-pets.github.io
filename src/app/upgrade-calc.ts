import { UserStats } from "./user-stats";
import { PetCalculator } from "./pet-calculator";
import { Constants } from "./constants";
import { CalcificationCosts, GenSpeedCosts, MetallicCosts, ShinyLuckCosts } from "./upgrade-costs";
import { DataService } from "./data.service";
import { Duration } from "./duration";

export abstract class UpgradeCalc {
  protected data: DataService

  increase: number
  increase2: number
  base_stats: UserStats = new UserStats()
  stats: UserStats = new UserStats()
  calc: PetCalculator = new PetCalculator(this.stats)
  upgrade_duration: Duration = Duration.from_seconds(0)

  protected constructor(protected _data: DataService, initial_increase: number, initial_increase2: number=0) {
    this.data = _data
    this.increase = initial_increase
    this.increase2 = initial_increase2
  }

  protected abstract apply_increase(): void

  recalculate() {
    this.stats.assign(this.data.stats)
    this.apply_increase()
    this.calc.recalculate(this.data.hatch_info, this.data.duration)
    this.upgrade_duration = Duration.from_seconds(this.cost() * (this.data.duration.total_seconds()/this.data.calc.stones()))
  }

  abstract cost(): number

  extra_stones(): number {
    return this.calc.stones() - this.data.calc.stones()
  }
  extra_stones_pct(): number {
    return this.extra_stones() / this.data.calc.stones()
  }
  extra_mythicals(): number {
    return this.calc.mythicals() - this.data.calc.mythicals()
  }
  extra_mythicals_pct(): number {
    return this.extra_mythicals() / this.data.calc.mythicals()
  }
  extra_shiny_points(): number {
    return this.calc.shiny_score() - this.data.calc.shiny_score()
  }
  extra_shiny_points_pct(): number {
    return this.extra_shiny_points() / this.data.calc.shiny_score()
  }
  extra_shiny_skins(): number {
    return this.calc.shinies() - this.data.calc.shinies()
  }
  extra_shiny_skins_pct(): number {
    return this.extra_shiny_skins() / this.data.calc.shinies()
  }
  extra_metallics(): number {
    return this.calc.metallics() - this.data.calc.metallics()
  }
  extra_metallics_pct(): number {
    return this.extra_metallics() / this.data.calc.metallics()
  }
  extra_adj_metallics(): number {
    return this.calc.adj_metallics() - this.data.calc.adj_metallics()
  }
  extra_adj_metallics_pct(): number {
    return this.extra_adj_metallics() / this.data.calc.adj_metallics()
  }
  extra_cost_rate(): number {
    return (this.calc.cost / this.data.duration.total_seconds()) - (this.data.calc.cost / this.data.duration.total_seconds())
  }
  extra_cost_rate_pct(): number {
    return this.extra_cost_rate() / (this.data.calc.cost / this.data.duration.total_seconds())
  }
  days_to_recuperate() {
    return this.cost() / (this.extra_stones() / this.data.duration.total_days())
  }
  extra_total_cost(): number {
    return this.calc.cost - this.data.calc.cost
  }
}

export class CalcifyUpgradeCalc extends UpgradeCalc {
  private total_cost: number = 0

  constructor(data: DataService) {
    super(data, Constants.calcifyIncrease);
  }

  override apply_increase() {
    this.stats.increase_calcify_luck(this.increase)
  }

  override recalculate() {
    this.total_cost = 0
    this.upgrade_duration = Duration.from_seconds(0)
    this.stats.assign(this.data.stats)
    this.calc.recalculate(this.data.hatch_info, this.data.duration)

    for (let i=0; i < this.increase; i+= Constants.calcifyIncrease) {
      let cost = CalcificationCosts.next(this.stats.calcify_luck_pct!)
      this.total_cost += cost
      this.upgrade_duration.seconds! += cost * (this.data.duration.total_seconds()/this.calc.stones())
      this.stats.increase_calcify_luck(Constants.calcifyIncrease)
      this.calc.recalculate(this.data.hatch_info, this.data.duration)
    }
  }

  override cost(): number {
    return this.total_cost
  }
}

export class GenSpeedUpgradeCalc extends UpgradeCalc {
  constructor(data: DataService) {
    super(data, Constants.genSpeedIncrease);
  }

  override apply_increase() {
    this.stats.increase_gen_speed(this.increase)
  }

  override cost(): number {
    let cost = 0
    for (let i=0; i < this.increase; i+=Constants.genSpeedIncrease) {
      cost += GenSpeedCosts.next(this.data.stats.gen_spd! + i)
    }
    return cost
  }
}

export class ShinyUpgradeCalc extends UpgradeCalc {
  constructor(data: DataService) {
    super(data, Constants.shinyLuckIncrease);
  }

  override apply_increase() {
    this.stats.increase_shiny_luck(this.increase)
    this.stats.increase_shiny_badge_luck(this.increase2)
  }

  override cost(): number {
    let cost = 0
    for (let i=0; i < this.increase; i+=Constants.shinyLuckIncrease) {
      cost += ShinyLuckCosts.next(this.data.stats.shiny_wall_luck! + i)
    }
    return cost
  }
}

export class MetallicUpgradeCalc extends UpgradeCalc {
  constructor(data: DataService) {
    super(data, Constants.metallicLuckIncrease, 0);
  }

  override apply_increase() {
    this.stats.increase_metallic_luck(this.increase)
    this.stats.increase_metallic_badge_luck(this.increase2)
  }

  override cost(): number {
    let cost = 0
    for (let i=0; i < Math.round(this.increase * 100000); i++) {
      cost += MetallicCosts.next(this.data.stats.metallic_upgrades() + i)
    }
    return cost
  }
}
