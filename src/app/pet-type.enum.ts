export enum PetType {
  Normal = 0,
  Shiny = 1,
  Chrome = 2,
  Gold = 3,
  Diamond = 4,
  Obsidian = 5,
  Titanium = 6
}

export namespace PetType {
  export function name(type: PetType): string {
    return PetType[type];
  }

  export function all(): PetType[] {
    return [PetType.Normal, PetType.Shiny, PetType.Chrome, PetType.Gold, PetType.Diamond, PetType.Obsidian, PetType.Titanium]
  }

  export function base_damage(type: PetType) {
    switch (type) {
      case PetType.Normal:
        return 10
      case PetType.Chrome:
        return 150
      case PetType.Gold:
        return 350
      case PetType.Diamond:
        return 750
      case PetType.Obsidian:
        return 1200
      case PetType.Titanium:
        return 1650
      case PetType.Shiny:
        return 0  // todo
      default:
        return -1
    }
  }

  export function damage_increment(type: PetType) {
    switch (type) {
      case PetType.Normal:
        return 10
      case PetType.Chrome:
        return 25
      case PetType.Gold:
      case PetType.Diamond:
      case PetType.Obsidian:  // todo: obsidian legendary to prod is +100 not +50
      case PetType.Titanium:
        return 50
      case PetType.Shiny:
        return 0  // todo
      default:
        return -1
    }
  }
}
