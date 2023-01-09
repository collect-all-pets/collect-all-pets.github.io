import { UserStats } from "./user-stats";
import { HatchInfo } from "./hatch-info";
import { Recommendation, Upgrade } from "./recommendation";
import { PetCalculator } from "./pet-calculator";
import { Duration } from "./duration";
import { CalcificationCosts, GenSpeedCosts, MetallicCosts } from "./upgrade-costs";

export class MetallicLuckResult {
  stats: UserStats
  calc: PetCalculator
  nextCost: number = 0
  secondsForUpgrade: number = 0
  // chanceMet: number = 0
  metallics: number = 0

  constructor(stats: UserStats) {
    this.stats = stats.clone();
    this.calc = new PetCalculator(this.stats)
  }
}

export class GenSpeedResult {
  stats: UserStats
  calc: PetCalculator
  genStones: number = 0
  secondsForUpgrade: number = 0
  // chanceMet: number = 0
  metallics: number = 0

  constructor(stats: UserStats) {
    this.stats = stats.clone();
    this.calc = new PetCalculator(this.stats)
  }
}

export class CalcifyLuckResult {
  stats: UserStats
  calc: PetCalculator
  calcifyStones: number = 0
  secondsForUpgrade: number = 0
  // chanceMet: number = 0
  metallics: number = 0

  constructor(stats: UserStats) {
    this.stats = stats.clone();
    this.calc = new PetCalculator(this.stats)
  }
}

export class MyOptimizer {
  oneDay: Duration = Duration.from_days(1)

  comparisonDur: Duration = Duration.from_hours(24) // extra duration to hatch eggs for to compare new chances

  optimize(_stats: UserStats, info: HatchInfo, _dur: Duration): Recommendation[] {
    let recommendations: Recommendation[] = []
    let amount = 20
    let stats = _stats.clone()

    while (recommendations.length < amount && !stats.is_max_all_3()) {
      let calc = new PetCalculator(stats)
      calc.hatch_all(info, this.oneDay)
      let secondsPerStone = calc.seconds_per_stone()

      let metRes = this.whatIfUpgradeMetallicLuck(info, stats, secondsPerStone)
      let genRes = this.whatIfUpgradeGenSpeed(info, stats, secondsPerStone, metRes)
      let calRes = this.whatIfUpgradeCalcifyLuck(info, stats, metRes)

      if (!stats.is_max_gen_spd() && (genRes.metallics >= metRes.metallics || stats.is_max_met_luck())) {
        if (stats.next_calcify_cost() < stats.next_gen_speed_cost() * 2) {
          recommendations.push(this.upgrade_calcify_luck(stats, info, _dur, secondsPerStone))
        } else {
          recommendations.push(this.upgrade_gen_speed(stats, info, _dur, secondsPerStone))
        }
      } else if (!stats.is_max_met_luck()) {
        recommendations.push(this.upgrade_met_luck(stats, info, _dur, secondsPerStone))
      } else if (!stats.is_max_calcify_luck()) {
        recommendations.push(this.upgrade_calcify_luck(stats, info, _dur, secondsPerStone))
      } else {
        break  // no more recommendations available
      }
    }
    return recommendations
  }

  upgrade_gen_speed(stats: UserStats, info: HatchInfo, _dur: Duration, secondsPerStone: number): Recommendation {
    stats.increase_gen_speed()
    let temp = new PetCalculator(stats)
    temp.hatch_all(info, _dur)
    let cost = GenSpeedCosts.for(stats.gen_spd!)
    return new Recommendation(Upgrade.GenSpeed, stats.gen_spd!, cost, temp.chance_of_metallic_pct(), temp.metallics(),
      secondsPerStone * cost / 3600)
  }

  upgrade_met_luck(stats: UserStats, info: HatchInfo, _dur: Duration, secondsPerStone: number): Recommendation {
    stats.increase_metallic_luck()
    let temp = new PetCalculator(stats)
    temp.hatch_all(info, _dur)
    let cost = MetallicCosts.for(stats.metallic_upgrades())
    return new Recommendation(Upgrade.MetallicLuck, stats.metallic_upgrades(), cost, temp.chance_of_metallic_pct(), temp.metallics(),
      secondsPerStone * cost / 3600)
  }

  upgrade_calcify_luck(stats: UserStats, info: HatchInfo, _dur: Duration, secondsPerStone: number): Recommendation {
    stats.increase_calcify_luck()
    let temp = new PetCalculator(stats)
    temp.hatch_all(info, _dur)
    let cost = CalcificationCosts.for(stats.calcify_luck_pct!)
    return new Recommendation(Upgrade.CalcifyLuck, stats.calcify_luck_pct! / 100, cost, temp.chance_of_metallic_pct(), temp.metallics(),
      secondsPerStone * cost / 3600)
  }

  whatIfUpgradeMetallicLuck(info: HatchInfo, _stats: UserStats, secondsPerStone: number): MetallicLuckResult {
    let res = new MetallicLuckResult(_stats)
    res.nextCost = MetallicCosts.next(res.stats.metallic_upgrades())
    res.secondsForUpgrade = secondsPerStone * res.nextCost
    // hatch using regular stats until we get enough stones to buy the darn thing
    res.calc.hatch_all(info, Duration.from_seconds(res.secondsForUpgrade))
    // store the number of metallics you would have gotten
    res.metallics += res.calc.metallics()
    // increase the stats
    res.stats.increase_metallic_luck()
    // reset and calculate the comparison duration using the new stats
    res.calc.reset()
    res.calc.hatch_all(info, Duration.from_seconds(res.secondsForUpgrade))
    res.metallics += res.calc.metallics()
    return res
  }

  whatIfUpgradeGenSpeed(info: HatchInfo, _stats: UserStats, secondsPerStone: number, metRes: MetallicLuckResult): GenSpeedResult {
    let res = new GenSpeedResult(_stats)
    while (res.genStones + GenSpeedCosts.next(res.stats.gen_spd!) < metRes.nextCost) {
      let cost = GenSpeedCosts.next(res.stats.gen_spd!)
      res.genStones += cost
      let secondsUntilUpgrade = secondsPerStone * cost
      res.secondsForUpgrade += secondsUntilUpgrade
      res.calc.hatch_all(info, Duration.from_seconds(secondsUntilUpgrade))
      res.stats.increase_gen_speed()
    }
    // hatch the rest of the time to catch up to metallic upgrade
    res.calc.hatch_all(info, Duration.from_seconds(metRes.secondsForUpgrade - res.secondsForUpgrade))
    // hatch the extra comparison duration using the new stats
    res.calc.hatch_all(info, Duration.from_seconds(metRes.secondsForUpgrade))
    res.metallics = res.calc.metallics()
    return res
  }

  whatIfUpgradeCalcifyLuck(info: HatchInfo, _stats: UserStats, metRes: MetallicLuckResult): CalcifyLuckResult {
    let res = new CalcifyLuckResult(_stats)
    while (res.calcifyStones + CalcificationCosts.next(res.stats.calcify_luck_pct!) < metRes.nextCost) {
      let calc = new PetCalculator(res.stats)
      calc.hatch_all(info, this.oneDay)
      let secondsPerStone = calc.seconds_per_stone()
      let cost = CalcificationCosts.next(res.stats.calcify_luck_pct!)
      res.calcifyStones += cost
      let secondsUntilUpgrade = secondsPerStone * cost
      res.secondsForUpgrade += secondsUntilUpgrade
      res.calc.hatch_all(info, Duration.from_seconds(secondsUntilUpgrade))
      res.stats.increase_calcify_luck()
    }
    // hatch the rest of the time to catch up to metallic upgrade
    res.calc.hatch_all(info, Duration.from_seconds(metRes.secondsForUpgrade - res.secondsForUpgrade))
    // hatch the extra comparison duration using the new stats
    res.calc.hatch_all(info, this.comparisonDur)
    res.metallics = res.calc.metallics()
    return res
  }

  // whatIfUpgradeMetallicLuck(info: HatchInfo, _stats: UserStats, secondsPerStone: number): MetallicLuckResult {
  //   let res = new MetallicLuckResult(_stats)
  //   res.nextCost = MetallicCosts.next(res.stats.metallic_upgrades())
  //   res.secondsForUpgrade = secondsPerStone * res.nextCost
  //   // hatch using regular stats until we get enough stones to buy the darn thing
  //   res.calc.hatch_all(info, Duration.from_seconds(res.secondsForUpgrade))
  //   res.stats.metallic_luck_pct += metallicLuckIncrease
  //   // hatch an extra day to make the comparison
  //   res.calc.hatch_all(info, this.comparisonDur)
  //   res.chanceMet = res.calc.chance_of_metallic_pct()
  //   return res
  // }
  //
  // whatIfUpgradeGenSpeed(info: HatchInfo, _stats: UserStats, secondsPerStone: number, metRes: MetallicLuckResult): GenSpeedResult {
  //   let res = new GenSpeedResult(_stats)
  //   while (res.genStones + GenSpeedCosts.next(res.stats.gen_spd) < metRes.nextCost) {
  //     let cost = GenSpeedCosts.next(res.stats.gen_spd)
  //     res.genStones += cost
  //     res.secondsForUpgrade += secondsPerStone * cost
  //     res.calc.hatch_all(info, Duration.from_seconds(secondsPerStone * cost))
  //     res.stats.gen_spd += genSpeedIncrease
  //   }
  //   // hatch the rest of the time to catch up to metallic upgrade
  //   res.calc.hatch_all(info, Duration.from_seconds(metRes.secondsForUpgrade - res.secondsForUpgrade))
  //   // hatch an extra day to make the comparison
  //   res.calc.hatch_all(info, this.comparisonDur)
  //   res.chanceMet = res.calc.chance_of_metallic_pct()
  //   return res
  // }
}
