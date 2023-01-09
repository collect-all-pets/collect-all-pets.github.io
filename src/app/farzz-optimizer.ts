import { UserStats } from "./user-stats"
import { PetCalculator } from "./pet-calculator"
import { Egg } from "./egg.enum"
import { Recommendation, Upgrade } from "./recommendation"
import { HatchInfo } from "./hatch-info";
import { Duration } from "./duration";
import { CalcificationCosts, GenSpeedCosts, MetallicCosts } from "./upgrade-costs";

export class data {
  CalcLuck: number = 0
  count: number = 0
  ExtraHatchesFromGenSpeed: number = 0
  recommendations: Recommendation[] = []
}

const amount = 20

export class FarzzOptimizer {
  MetallicCosts = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000]

  optimize(stats: UserStats, hatch: HatchInfo): Recommendation[] {
    let ExtraHatchesFromGenSpeed = 0
    let ExtraHatchesFromMetallicLuck = 0
    let GenChancesPerDay = 0
    let StonesPerDay = 0
    let recommendations: Recommendation[] = []
    let MetallicUpgrades = stats.metallic_luck_pct! * 100000
    let MetallicLuckCost = MetallicCosts.next(MetallicUpgrades)
    let MetallicAchievementLuck = stats.metallic_badge_luck!
    let GenerationSpeed = stats.gen_spd!
    let CalcLuck = stats.calcify_luck_pct! / 100.0
    let count = 0

    let calc = new PetCalculator(stats)
    calc.hatch_all(hatch, Duration.from_days(1))
    StonesPerDay = calc.stones()

    let calc2 = new PetCalculator(stats)
    calc2.hatch(hatch.gen_egg!, 864)
    GenChancesPerDay = calc2.new_pets()

    if (hatch.gen_egg! == Egg.Prodigious && hatch.hatch_egg! == Egg.Prodigious) {
      let GenStoneCost = 0
      let CalcStoneCost = 0
      while (count < amount) {
        CalcStoneCost = CalcificationCosts.next(CalcLuck * 100.0)
        GenStoneCost = GenSpeedCosts.next(GenerationSpeed)
        if (CalcLuck >= 1.0) {
          GenerationSpeed += 0.01
          recommendations.push(new Recommendation(Upgrade.GenSpeed, GenerationSpeed, GenSpeedCosts.for(GenerationSpeed)))
          count++
        } else if (Math.round(CalcStoneCost) <= Math.round(GenStoneCost * 2)) {
          CalcLuck += 0.01
          recommendations.push(new Recommendation(Upgrade.CalcifyLuck, CalcLuck, CalcificationCosts.for(CalcLuck * 100.0)))
          count++
        } else {
          GenerationSpeed += 0.01
          recommendations.push(new Recommendation(Upgrade.GenSpeed, GenerationSpeed, GenSpeedCosts.for(GenerationSpeed)))
          count++
        }
      }
    } else {
      while (recommendations.length < amount) {
        let data = this.extraHatchesFromGenSpeed(MetallicLuckCost, StonesPerDay, GenerationSpeed, GenChancesPerDay, CalcLuck)
        ExtraHatchesFromGenSpeed = data.ExtraHatchesFromGenSpeed
        count += data.count
        CalcLuck = data.CalcLuck
        for (let r of data.recommendations) {
          recommendations.push(r)
        }
        if (MetallicLuckCost == 10) {
          MetallicUpgrades++
          recommendations.push(new Recommendation(Upgrade.MetallicLuck, MetallicUpgrades, MetallicLuckCost))
          MetallicLuckCost = 25
          ExtraHatchesFromMetallicLuck = (10000000 / (MetallicUpgrades * MetallicAchievementLuck)) - (10000000 / ((MetallicUpgrades + 1) * MetallicAchievementLuck))
          count++
        } else {
          ExtraHatchesFromMetallicLuck = (10000000 / (MetallicUpgrades * MetallicAchievementLuck)) - (10000000 / ((MetallicUpgrades + 1) * MetallicAchievementLuck))
        }

        if (ExtraHatchesFromGenSpeed > ExtraHatchesFromMetallicLuck) {
          GenerationSpeed += 0.01
          recommendations.push(new Recommendation(Upgrade.GenSpeed, GenerationSpeed, GenSpeedCosts.for(GenerationSpeed)))
        } else if (ExtraHatchesFromMetallicLuck > ExtraHatchesFromGenSpeed) {
          MetallicUpgrades++
          recommendations.push(new Recommendation(Upgrade.MetallicLuck, MetallicUpgrades, MetallicLuckCost))
          MetallicLuckCost = MetallicCosts.next(MetallicUpgrades)
        }
        count++
      }
    }

    // for (int i = 0; i < recommendations.size(); i++) {
    //     Recommendation r = recommendations.get(i)
    //     int j = i
    //     while (j + 1 < recommendations.size() && recommendations.get(j+1).upgrade == r.upgrade) {
    //         j++
    //     }
    //     r = recommendations.get(j)
    //     System.out.printf("%20s to %8.02f %3d upgrade(s)\n", r.upgrade.name(), r.value, j-i+1)
    //     i=j
    // }
    return recommendations
  }

  extraHatchesFromGenSpeed(MetallicLuckCost: number, StonesPerDay: number, GenerationSpeed: number, GenChancesPerDay: number, _CalcLuck: number): data {
    let d = new data()
    d.CalcLuck = _CalcLuck
    let SubtractableMetallicLuckCost = MetallicLuckCost
    let EditableGenerationSpeed = GenerationSpeed
    let GenStoneCost = 0
    let CalcStoneCost = 0
    let DaysForMetallicLuck = 0
    d.ExtraHatchesFromGenSpeed = 0
    if (d.CalcLuck < 0.5) {
      CalcStoneCost = (d.CalcLuck * 5000) + 50
    } else if (d.CalcLuck <= 1) {
      CalcStoneCost = ((d.CalcLuck - 0.5) * 10000) + 2600
    }
    while (SubtractableMetallicLuckCost >= 0) {
      DaysForMetallicLuck = MetallicLuckCost / StonesPerDay
      d.ExtraHatchesFromGenSpeed += GenChancesPerDay * DaysForMetallicLuck
      GenStoneCost = GenSpeedCosts.next(EditableGenerationSpeed)
      while (Math.round(CalcStoneCost) <= Math.round(GenStoneCost * 2)) {
        if (d.CalcLuck >= 1.0 || d.recommendations.length >= amount) {
          break
        }
        if (Math.round(CalcStoneCost) <= Math.round(GenStoneCost * 2) && SubtractableMetallicLuckCost == MetallicLuckCost) {
          d.CalcLuck += 0.01
          d.recommendations.push(new Recommendation(Upgrade.CalcifyLuck, d.CalcLuck, CalcStoneCost))
        } else {
          break
        }
        if (d.CalcLuck < 0.5) {
          CalcStoneCost = (d.CalcLuck * 5000) + 50
        } else if (d.CalcLuck <= 1) {
          CalcStoneCost = ((d.CalcLuck - 0.5) * 10000) + 2600
        }
      }
      SubtractableMetallicLuckCost -= GenStoneCost
      EditableGenerationSpeed += 0.01
    }
    return d
  }
}
