import { EventEmitter, Injectable } from '@angular/core';
import { UserStats } from "./user-stats";
import { HatchInfo } from "./hatch-info";
import { Duration } from "./duration";
import { UserConfig } from "./user-config";
import { PetCalculator } from "./pet-calculator";
import { FarzzOptimizer } from "./farzz-optimizer";
import { MyOptimizer } from "./my-optimizer";
import { Recommendation, Upgrade } from "./recommendation";
import { PersistenceService } from "./persistence.service";
import { Egg } from "./egg.enum";
import { Page } from "./page";
import { CalcifyUpgradeCalc, GenSpeedUpgradeCalc, MetallicUpgradeCalc, ShinyUpgradeCalc } from "./upgrade-calc";
import { RebirthSimulator } from "./rebirth-simulator";
import { PetType } from "./pet-type.enum";
import { PetsConfig } from "./pets-config";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  stats: UserStats = new UserStats()
  hatch_info: HatchInfo = new HatchInfo()
  duration: Duration = Duration.from_days(1)
  cfg: UserConfig = new UserConfig()
  pets: PetsConfig = new PetsConfig()

  calc: PetCalculator = new PetCalculator(this.stats)
  farzzOptimizer: FarzzOptimizer = new FarzzOptimizer()
  myOptimizer: MyOptimizer = new MyOptimizer()
  farzzRecommendations: Recommendation[] = []
  myRecommendations: Recommendation[] = []
  calcifyUpgrade: CalcifyUpgradeCalc = new CalcifyUpgradeCalc(this)
  genUpgrade: GenSpeedUpgradeCalc = new GenSpeedUpgradeCalc(this)
  shinyUpgrade: ShinyUpgradeCalc = new ShinyUpgradeCalc(this)
  metallicUpgrade: MetallicUpgradeCalc = new MetallicUpgradeCalc(this)
  rebirthSim: RebirthSimulator = new RebirthSimulator(this)

  calculatorEvents: EventEmitter<any> = new EventEmitter();

  pages: Page[] = [
    {route: '', name: 'Home'},
    {route: 'calculator', name: 'Advanced Calculator'},
    // {route: 'gold', name: 'Gold Conversions'},
    {route: 'rebirth', name: 'Rebirth'},
    {route: 'damage', name: 'Damage'},
    {route: 'metallic-odds', name: 'Metallic Odds'},
    {route: 'shiny-odds', name: 'Shiny Odds'},
    {route: 'exotic-luck', name: 'EC Luck'}
    // {route: 'upgrade-cost', name: 'Upgrade Cost'}
  ]

  constructor(private persistence: PersistenceService) { }

  reset() {
    Object.assign(this.stats, new UserStats())
    Object.assign(this.duration, Duration.from_days(1))
    Object.assign(this.hatch_info, new HatchInfo())
    Object.assign(this.cfg, new UserConfig())
    Object.assign(this.pets, new PetsConfig())

    Object.assign(this.calcifyUpgrade, new CalcifyUpgradeCalc(this))
    Object.assign(this.genUpgrade, new GenSpeedUpgradeCalc(this))
    Object.assign(this.shinyUpgrade, new ShinyUpgradeCalc(this))
    Object.assign(this.metallicUpgrade, new MetallicUpgradeCalc(this))
    Object.assign(this.rebirthSim, new RebirthSimulator(this))
    this.update_calc()
  }

  save() {
    // todo: should this save hatch info and duration?
    this.persistence.persist(this.stats, this.duration, this.hatch_info, this.cfg, this.pets)
  }

  restore() {
    this.persistence.restore(this.stats, this.duration, this.hatch_info, this.cfg, this.pets)
    console.log(this.stats)
    console.log(this.duration)
    console.log(this.hatch_info)
    console.log(this.cfg)
    console.log(this.pets)
    this.update_calc()
  }

  update_calc() {
    console.log(this.stats)
    this.calc.recalculate(this.hatch_info, this.duration)
    if (this.stats.is_metallic_possible()) {
      this.farzzRecommendations = this.farzzOptimizer.optimize(this.stats, this.hatch_info)
      this.myRecommendations = this.myOptimizer.optimize(this.stats, this.hatch_info, this.duration)
    } else {
      this.farzzRecommendations = []
      this.myRecommendations = []
    }
    this.update_whatIfs()
    this.calculatorEvents.emit()
  }

  update_whatIfs() {
    this.calcifyUpgrade.recalculate()
    this.genUpgrade.recalculate()
    this.shinyUpgrade.recalculate()
    this.metallicUpgrade.recalculate()
  }

  import() {
    // todo
  }

  export() {
    // todo
  }

  upgrade_name(upgrade: Upgrade) {
    return Upgrade.name(upgrade)
  }

  upgrade_short_name(upgrade: Upgrade) {
    return Upgrade.shortName(upgrade)
  }

  get_upgrade_image(upgrade: Upgrade) {
    switch (upgrade) {
      case Upgrade.MetallicLuck:
        return "/assets/chrome.webp"
      case Upgrade.CalcifyLuck:
        return "/assets/stone.webp"
      case Upgrade.GenSpeed:
        return "/assets/common.webp"
      default:
        return ""
    }
  }

  get_adj_metallic_icon() {
    return this.get_metallic_icon_for(this.calc.adj_metallics())
  }

  get_metallic_icon() {
    return this.get_metallic_icon_for(this.calc.metallics())
  }

  get_metallic_icon_for(mets: number) {
    if (mets >= 5) {
      return "/assets/titanium.webp"
    } else if (mets >= 4) {
      return "/assets/obsidian.webp"
    } else if (mets >= 3) {
      return "/assets/diamond.webp"
    } else if (mets >= 2) {
      return "/assets/gold_metallic.webp"
    } else if (mets >= 1) {
      return "/assets/chrome.webp"
    } else {
      return "/assets/chrome.webp"
    }
  }

  all_eggs(): Egg[] {
    return Egg.all()
  }

  hatchable(): Egg[] {
    return Egg.hatchable()
  }

  pet_types(): PetType[] {
    return PetType.all()
  }

  type_name(type: PetType) {
    return PetType.name(type)
  }

  egg_name(egg: Egg) {
    return Egg.name(egg)
  }

  unique_count(egg: Egg): number {
    return Egg.unique(egg)
  }

  // inclusive of min and max
  generate_nums(min: number, max: number, step: number, precision: number): number[] {
    let res: number[] = []
    let num = min
    while (num <= max) {
      res.push(num)
      num = this.round_precision(num + step, precision)
    }
    return res
  }

  // inclusive of min and max
  generate_nums_reverse(min: number, max: number, step: number, precision: number): number[] {
    let res: number[] = []
    let num = max
    while (num >= min) {
      res.push(num)
      num = this.round_precision(num - step, precision)
    }
    return res
  }

  round_precision(val: number, precision: number): number {
    let exp = Math.pow(10, precision)
    return Math.round(val * exp) / exp
  }
}
