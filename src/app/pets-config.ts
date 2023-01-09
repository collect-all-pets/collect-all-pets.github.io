import { Pet } from "./pet";
import { UserStats } from "./user-stats";

export class PetsConfig {
  pet0: Pet = new Pet()
  pet1: Pet = new Pet()
  pet2: Pet = new Pet()
  pet3: Pet = new Pet()
  pet4: Pet = new Pet()
  pet5: Pet = new Pet()
  pet6: Pet = new Pet()
  pet7: Pet = new Pet()
  pet8: Pet = new Pet()
  pet9: Pet = new Pet()
  pet10: Pet = new Pet()
  pet11: Pet = new Pet()

  constructor() {
  }

  assign(cfg: PetsConfig) {
    if (cfg == null) {
      return
    }
    this.pet0.assign(cfg.pet0)
    this.pet1.assign(cfg.pet1)
    this.pet2.assign(cfg.pet2)
    this.pet3.assign(cfg.pet3)
    this.pet4.assign(cfg.pet4)
    this.pet5.assign(cfg.pet5)
    this.pet6.assign(cfg.pet6)
    this.pet7.assign(cfg.pet7)
    this.pet8.assign(cfg.pet8)
    this.pet9.assign(cfg.pet9)
    this.pet10.assign(cfg.pet10)
    this.pet11.assign(cfg.pet11)
  }
  clone(): PetsConfig {
    return Object.assign(new PetsConfig(), this)
  }

  pets(): Pet[] {
    return [this.pet0, this.pet1, this.pet2,
      this.pet3, this.pet4, this.pet5,
      this.pet6, this.pet7, this.pet8,
      this.pet9, this.pet10, this.pet11]
  }

  total_damage(stats: UserStats): number {
    let dmg = 0
    for (let pet of this.pets()) {
      dmg += pet.total_damage(stats)
    }
    return dmg
  }
}
