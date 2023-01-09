import { Egg } from "./egg.enum";
import { UserStats } from "./user-stats";
import { Duration } from "./duration";
import { HatchInfo } from "./hatch-info";
import { Statistics } from "./stats";

export class DistributionValue {
  successes: number = 0
  exactly: number = 0
  at_least: number = 0

  constructor(successes: number, exactly: number, at_least: number) {
    this.successes = successes;
    this.exactly = exactly;
    this.at_least = at_least;
  }
}

export class PetCalculator {
  stats: UserStats
  fuses: number = 0
  hatches: number = 0
  cost: number = 0
  eggs: number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
  total_eggs: number[] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
  duration: Duration = Duration.from_seconds(0)

  constructor(stats: UserStats) {
    this.stats = stats
  }

  reset() {
    this.fuses = 0
    this.hatches = 0
    this.cost = 0
    this.eggs = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    this.total_eggs = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    this.duration = Duration.from_seconds(0)
  }

  // resets and then hatches all
  recalculate(info: HatchInfo, duration: Duration) {
    this.reset()
    this.hatch_all(info, duration)
  }

  // cumulative (can be called multiple times without resetting)
  hatch_all(info: HatchInfo, duration: Duration) {
    if (info.should_gen) {
      // let gen_duty = info.gen_always_active ? 1.0 : info.gen_duty_pct/100.0
      let gen_duty = info.gen_duty_pct!/100.0
      if (info.should_gen2) {
        let pct2 = info.gen2_pct!/100.0
        this.hatch_for(info.gen_egg!, duration.total_seconds() * (1 - pct2) * gen_duty, this.stats.gen_spd!)
        this.hatch_for(info.gen_egg2!, duration.total_seconds() * pct2 * gen_duty, this.stats.gen_spd!)
      } else {
        this.hatch_for(info.gen_egg!, duration.total_seconds() * gen_duty, this.stats.gen_spd!)
      }
    }
    if (info.should_hatch) {
      // let hatch_duty = info.hatch_always_active ? 1.0 : info.hatch_duty_pct/100.0
      let hatch_duty = info.hatch_duty_pct!/100.0
      if (info.should_hatch2) {
        let pct2 = info.hatch2_pct! / 100.0
        this.hatch_for(info.hatch_egg!, duration.total_seconds() * (1 - pct2) * hatch_duty, this.stats.auto_hatch_speed!)
        this.hatch_for(info.hatch_egg2!, duration.total_seconds() * pct2 * hatch_duty, this.stats.auto_hatch_speed!)
      } else {
        this.hatch_for(info.hatch_egg!, duration.total_seconds() * hatch_duty, this.stats.auto_hatch_speed!)
      }
    }
    this.duration.seconds! += duration.total_seconds()
  }

  fuse_all() {
    for (let egg = Egg.Common; egg < Egg.Mythical; egg++) {
      this.fuse(egg)
    }
  }

  fuse(egg: Egg) {
    if (this.eggs[egg] == 0) {
      return
    }

    let fuses = this.eggs[egg] / Egg.perFuse(egg)

    let regular = fuses * (1 - this.stats.fuse_luck())
    this.eggs[egg + 1] += regular
    this.total_eggs[egg + 1] += regular

    let upgraded = fuses * this.stats.fuse_luck()
    let upgradedEgg = Math.min(egg + 2, Egg.Mythical)
    this.eggs[upgradedEgg] += upgraded
    this.total_eggs[upgradedEgg] += upgraded

    this.fuses += fuses
    this.eggs[egg] = 0
  }

  hatch(egg: Egg, count: number) {
    this.hatches += count
    this.cost += Egg.cost(egg, this.stats.cheaper_eggs, this.stats.even_cheaper) * count

    let regular = count * (1 - this.stats.egg_luck())
    this.eggs[egg] += regular
    this.total_eggs[egg] += regular

    let upgraded = count * this.stats.egg_luck()
    this.eggs[egg + 1] += upgraded
    this.total_eggs[egg + 1] += upgraded
    this.fuse_all()
  }

  hatch_for(egg: Egg, speed: number, seconds: number) {
    this.hatch(egg, speed * seconds)
  }

  eggs_per_metallic() {
    return 1.0/this.stats.metallic_luck()
  }

  eggs_per_shiny() {
    return 1.0/this.stats.shiny_luck()
  }

  mythicals() {
    return this.eggs[Egg.Mythical]
  }

  stones() {
    return this.mythicals() + (this.mythicals() * this.stats.stone_luck())
  }

  metallics() {
    return this.new_pets() * this.stats.metallic_luck()
  }

  new_pets() {
    return this.hatches + this.fuses
  }

  chance_of_metallic_pct() {
    return this.stats.chance_of_metallic_pct_for(this.new_pets())
  }

  adj_chance_of_metallic_pct() {
    return this.adj_chance_of_metallic_pct_for_scale(1)
  }

  adj_chance_of_metallic_pct_for_scale(scale: number) {
    let prob = 0
    for (let egg of Egg.all()) {
      let wontHappen = 1 - this.stats.metallic_luck_for_egg(egg) // chance you won't get a metallic this egg
      let stillWontHappen = Math.pow(wontHappen, this.total_eggs[egg] * scale) // chances you won't get a metallic over any egg
      let willHappen = 1 - stillWontHappen // chances you will get at least 1 metallic
      prob = (prob + willHappen) - (willHappen * prob)
    }
    return prob * 100  // in percent
  }

  chance_of_metallic_pct_for_egg_scale(egg: Egg, scale: number): number {
    let wontHappen = 1 - this.stats.metallic_luck_for_egg(egg) // chance you won't get a metallic this egg
    let stillWontHappen = Math.pow(wontHappen, this.total_eggs[egg] * scale) // chances you won't get a metallic over any egg
    let willHappen = 1 - stillWontHappen // chances you will get at least 1 metallic
    return willHappen * 100  // in percent
  }

  metallic_binomial_probability(successes: number): number {
    return Statistics.binomialProbabilityMass(successes, this.new_pets(), this.stats.metallic_luck())
    // let prob = 0
    // for (let egg of Egg.all()) {
    //   let willHappen = this.met
    //   prob = (prob + willHappen) - (willHappen * prob)
    // }
    // console.log('prob: ' + prob)
    // return Statistics.binomialProbabilityMass(successes, this.new_pets(), prob)
  }

  metallic_binomial_probability_for_egg(egg: Egg, successes: number): number {
    return Statistics.binomialProbabilityMass(successes, this.total_eggs[egg], this.stats.metallic_luck_for_egg(egg))
  }

  metallic_binomial_distribution_for_egg(egg: Egg): DistributionValue[] {
    let probs = []
    for (let i=0; true; i++) {
      let res = this.metallic_binomial_probability_for_egg(egg, i)
      probs.push(res)
      if (res < 0.001 && i >= Math.ceil(this.metallics())) {
        break
      }
    }

    let results: DistributionValue[] = []
    let prev = null
    for (let i=0; i < probs.length; i++) {
      let res: DistributionValue = new DistributionValue(i, probs[i], prev == null ? 1 : prev.at_least - prev.exactly)
      results.push(res)
      prev = res
    }
    return results
  }

  metallic_binomial_distribution(): DistributionValue[] {
    let probs = []
    for (let i=0; true; i++) {
      let res = this.metallic_binomial_probability(i)
      probs.push(res)
      if (res < 0.01 && i >= Math.ceil(this.metallics())) {
        break
      }
    }

    let results: DistributionValue[] = []
    let prev = null
    for (let i=0; i < probs.length; i++) {
      let res: DistributionValue = new DistributionValue(i, probs[i], prev == null ? 1 : prev.at_least - prev.exactly)
      results.push(res)
      prev = res
    }
    return results
  }

  chance_of_shiny_pct() {
    let wontHappen = 1 - this.stats.shiny_luck() // chance you won't get a shiny this egg
    let stillWontHappen = Math.pow(wontHappen, this.new_pets()) // chances you won't get a shiny over any egg
    let willHappen = 1 - stillWontHappen // chances you will get at least 1 shiny
    return willHappen * 100  // in percent
  }

  shinies() {
    return this.new_pets() * this.stats.shiny_luck()
  }

  shiny_score() {
    let score = 0
    for (let egg = Egg.Common; egg <= Egg.Mythical; egg++) {
      score += this.total_eggs[egg] * this.stats.shiny_luck() * Egg.shinyPoints(egg)
      // todo: should it be raw or floored?
      // score += Math.floor(Math.floor(this.total_eggs[egg]) * this.stats.shiny_luck()) * Egg.shinyPoints(egg)
    }
    return score
  }

  cost_per_shiny_point() {
    return this.cost / this.shiny_score()
  }

  cost_per_stone() {
    return this.cost / this.stones()
  }

  stones_per_billion() {
    return 1000000000 / this.cost_per_stone()
  }

  shiny_score_per_billion() {
    return 1000000000 / this.cost_per_shiny_point()
  }

  cost_per_metallic() {
    return this.cost / this.metallics()
  }

  // note: this method only works if you passed hatch_all with a duration!
  seconds_per_stone() {
    return this.duration.total_seconds() / this.stones()
  }

  adj_metallic_for_egg(egg: Egg) {
    return this.total_eggs[egg] * this.stats.metallic_luck_for_egg(egg)
  }

  // metallics adjusted for titanium pets
  adj_metallics() {
    let mets = 0
    for (let egg of Egg.all()) {
      if (this.total_eggs[egg] > 0) {
        mets += this.adj_metallic_for_egg(egg)
      }
    }
    return mets
  }
}
