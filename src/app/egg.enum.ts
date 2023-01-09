export enum Egg {
  Common = 0,
  Uncommon = 1,
  Rare = 2,
  Epic = 3,
  Legendary = 4,
  Prodigious = 5,
  Ascended = 6,
  Mythical = 7,
}

export namespace Egg {
  export function name(egg: Egg): string {
    return Egg[egg];
  }

  export function all(): Egg[] {
    return [Egg.Common, Egg.Uncommon, Egg.Rare, Egg.Epic, Egg.Legendary, Egg.Prodigious, Egg.Ascended, Egg.Mythical]
  }

  export function hatchable(): Egg[] {
    return [Egg.Common, Egg.Uncommon, Egg.Rare, Egg.Epic, Egg.Legendary, Egg.Prodigious]
  }

  export function cost(egg: Egg, cheaper: boolean, evenCheaper: boolean): number {
    // can't have evenCheaper without cheaper
    evenCheaper = cheaper && evenCheaper

    switch (egg) {
      case Egg.Common:
        return evenCheaper ? 5500 : cheaper ? 6500 : 7500
      case Egg.Uncommon:
        return evenCheaper ? 25000 : cheaper ? 30000 : 35000
      case Egg.Rare:
        return evenCheaper ? 120000 : cheaper ? 140000 : 160000
      case Egg.Epic:
        return evenCheaper ? 550000 : cheaper ? 650000 : 750000
      case Egg.Legendary:
        return evenCheaper ? 2500000 : cheaper ? 3000000 : 3500000
      case Egg.Prodigious:
        return evenCheaper ? 8000000 : cheaper ? 10000000 : 12000000

      default:
        return -1
    }
  }

  export function unique(egg: Egg): number {
    switch (egg) {
      case Egg.Common:
        return 42
      case Egg.Uncommon:
      case Egg.Epic:
        return 48
      case Egg.Rare:
        return 60
      case Egg.Legendary:
        return 24
      case Egg.Prodigious:
      case Egg.Ascended:
      case Egg.Mythical:
        return 6

      default:
        return -1
    }
  }

  export function perFuse(egg: Egg): number {
    if (egg == Egg.Prodigious || egg == Egg.Ascended) {
      return 3;
    }
    return 5;
  }

  export function shinyPoints(egg: Egg): number {
    switch (egg) {
      case Egg.Common: return 1
      case Egg.Uncommon: return 3
      case Egg.Rare: return 5
      case Egg.Epic: return 10
      case Egg.Legendary: return 15
      case Egg.Prodigious: return 20
      case Egg.Ascended: return 30
      case Egg.Mythical: return 40
      default: return 0
    }
  }


}
