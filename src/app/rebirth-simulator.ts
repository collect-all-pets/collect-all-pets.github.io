import { Egg } from "./egg.enum";
import { DataService } from "./data.service";


export class EggCount {
  shinies: number = 0
  metallics: number = 0
}

export class MinMax {
  min: number = Number.MAX_VALUE
  max: number = Number.MIN_VALUE
  total: number = 0
  samples: number = 0

  update(val: number) {
    this.samples++
    this.total += val
    if (val > this.max) {
      this.max = val
    }
    if (val < this.min) {
      this.min = val
    }
  }

  reset() {
    this.min = Number.MAX_VALUE
    this.max = Number.MIN_VALUE
    this.total = 0
    this.samples = 0
  }
}

export class RebirthResult {
  times: number = 0
  counts: EggCount[] = [new EggCount(), new EggCount(), new EggCount(), new EggCount(), new EggCount(), new EggCount(), new EggCount(), new EggCount()]
  cost: MinMax = new MinMax()
  hatches: MinMax = new MinMax()
  seconds: MinMax = new MinMax()

  metallic_count() {
    let count = 0;
    for (let c of this.counts) {
      count += c.metallics
    }
    return count
  }

  shiny_count() {
    let count = 0
    for (let c of this.counts) {
      count += c.shinies
    }
    return count
  }

  shiny_score() {
    let score = 0
    for (let egg=Egg.Common; egg <= Egg.Mythical; egg++) {
      score += Egg.shinyPoints(egg) * this.counts[egg].shinies
    }
    return score
  }
}


export class RebirthSimulator {
  isRunning = false
  isComplete = false

  result = new RebirthResult()

  hatched = 0
  fused = 0
  cost = 0
  times = 100
  stopEgg: Egg = Egg.Prodigious
  counts: number[] = [0,0,0,0,0,0,0,0]
  shinies: number[] = [0,0,0,0,0,0,0,0]
  metallics: number[] = [0,0,0,0,0,0,0,0]
  uniques: boolean[][] = this.createEggsArray(false)
  eggs: number[][] = this.createEggsArray(0)
  private data: DataService

  constructor(private _data: DataService) {
    this.data = _data
  }

  reset() {
    this.eggs = this.createEggsArray(0)
    this.uniques = this.createEggsArray(false)
    this.counts = [0,0,0,0,0,0,0,0]
    this.shinies = [0,0,0,0,0,0,0,0]
    this.metallics = [0,0,0,0,0,0,0,0]
    this.hatched = 0
    this.fused = 0
    this.cost = 0
    this.isComplete = false
  }

  private createEggsArray(fillValue: boolean | number) {
    let arr = [new Array(Egg.unique(Egg.Common)),
      new Array(Egg.unique(Egg.Uncommon)),
      new Array(Egg.unique(Egg.Rare)),
      new Array(Egg.unique(Egg.Epic)),
      new Array(Egg.unique(Egg.Legendary)),
      new Array(Egg.unique(Egg.Prodigious)),
      new Array(Egg.unique(Egg.Ascended)),
      new Array(Egg.unique(Egg.Mythical))]
    for (let egg=Egg.Common; egg <= Egg.Mythical; egg++) {
      arr[egg].fill(fillValue)
    }
    return arr
  }

  simulate_all() {
    this.isRunning = true

    this.result = new RebirthResult()
    this.result.times = this.times
    for (let i=0; i < this.times; i++) {
      this.simulate()
      this.result.seconds.update(this.hatched / this.data.stats.gen_spd!)
      this.result.cost.update(this.cost)
      this.result.hatches.update(this.hatched)
      for (let egg of Egg.all()) {
        this.result.counts[egg].shinies += this.shinies[egg]
        this.result.counts[egg].metallics += this.metallics[egg]
      }
    }

    this.isComplete = true
    this.isRunning = false
  }

  simulate() {
    this.reset()
    for (let egg=0; egg <= Egg.Mythical; egg++) {
      while (!this.discovered_all(egg)) {
        this.hatch(Math.min(this.stopEgg, egg))  // hatch the current egg, or stop egg
      }
    }
    console.log(this)
    console.log('Rebirth Simulation Completed in: ' + (this.hatched / this.data.stats.gen_spd!) + ' seconds (' + (this.hatched / this.data.stats.gen_spd! / 60) + ' minutes)')
  }

  private next_pet(egg: Egg, save_pet: number = -1) {
    let pet
    if (save_pet != -1) {
      pet = save_pet
    } else {
      // randomly pick a pet
      let unique_count = Egg.unique(egg)
      pet = Math.floor(Math.random() * unique_count)
      if (Math.random() < this.data.stats.discovery_luck()) {
        // luck discover. find the next non-discovered pet
        for (let i = 0; i < unique_count; i++) {
          if (!this.uniques[egg][i]) {
            pet = i
            break
          }
        }
      }
    }

    if (Math.random() < this.data.stats.shiny_luck()) {
      this.shinies[egg]++
    }
    if (Math.random() < this.data.stats.metallic_luck()) {
      this.metallics[egg]++
    }

    this.uniques[egg][pet] = true
    this.eggs[egg][pet]++
    this.counts[egg]++
  }

  hatch(egg: Egg) {
    this.hatched++
    this.cost += Egg.cost(egg, this.data.stats.cheaper_eggs, this.data.stats.even_cheaper)
    if (Math.random() < this.data.stats.egg_luck()) {
      egg += 1  // lucky hatch
    }

    this.next_pet(egg)

    if (egg < Egg.Mythical) {
      this.fuse(egg)
    }
  }

  private discovered_all(egg: Egg): boolean {
    for (let unique of this.uniques[egg]) {
      if (!unique) {
        return false
      }
    }
    return true
  }

  fuse(egg: Egg) {
    if (egg >= Egg.Mythical) {
      return
    }

    let per_fuse = Egg.perFuse(egg)
    if (egg < Egg.Prodigious) {
      if (this.counts[egg] >= per_fuse) {
        this.counts[egg] -= per_fuse
        let removed = 0
        for (let i=0; i < this.eggs[egg].length; i++) {
          while (removed < per_fuse && this.eggs[egg][i] > 0) {
            removed++
            this.eggs[egg][i]--
          }
        }
        this.next_pet(egg+1)
        this.fused++
      }
    } else {
      for (let i=0; i < Egg.unique(egg); i++) {
        if (this.eggs[egg][i] >= per_fuse) {
          this.counts[egg] -= per_fuse
          this.eggs[egg][i] -= per_fuse
          this.next_pet(egg+1, i)
          this.fused++
        }
      }
    }

    // fuse the chain
    if (egg + 1 < Egg.Mythical) {
      this.fuse(egg+1)
    }
  }

}
