import { Egg } from "./egg.enum";
import { PetType } from "./pet-type.enum";
import { UserStats } from "./user-stats";

// 2D array indexed by Egg then by PetType
const base_damages = [
  [10,18,150,350,750,1200,1600],
  [20,36,175,400,800,1250,1700],
  [30,54,200,450,850,1300,1750],
  [40,72,225,500,900,1350,1800],
  [50,90,250,550,950,1400,1850],
  [60,108,275,600,1000,1500,1900],
  [70,126,300,650,1050,1550,1950],
  [80,144,325,700,1100,1600,2000]
]

export class Pet {
  rarity: Egg | null = null
  type: PetType | null = null
  skins: number | null = null

  assign(pet: Pet) {
    if (pet == null) {
      return
    }
    Object.assign(this, pet)
  }
  clone(): Pet {
    return Object.assign(new Pet(), this)
  }

  base_damage() {
    if (this.rarity == null || this.type == null) {
      return 0
    }
    return base_damages[this.rarity!][this.type!]
  }

  total_damage(stats: UserStats) {
    let dmg = this.base_damage()
    dmg *= stats.damage_multiplier()
    if (stats.polished_metal && this.type! >= PetType.Chrome && this.skins! > 0) {
      dmg *= 1 + (this.skins! / 1000.0)
    }
    return Math.floor(dmg)
  }
}
