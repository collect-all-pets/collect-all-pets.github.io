
export enum Upgrade {
  MetallicLuck,
  GenSpeed,
  CalcifyLuck,
}

export namespace Upgrade {
  export function name(upgrade: Upgrade): string {
    switch (upgrade) {
      case Upgrade.CalcifyLuck:
        return 'Calcify Luck'
      case Upgrade.GenSpeed:
        return 'Gen Speed'
      case Upgrade.MetallicLuck:
        return 'Metallic Luck'
      default:
        return 'Unknown'
    }
  }

  export function shortName(upgrade: Upgrade): string {
    return Upgrade[upgrade]
  }
}

export class Recommendation {
  upgrade: Upgrade
  value: number
  cost: number
  chanceMetPct: number
  metallics: number
  hoursPerUpgrade: number

  constructor(upgrade: Upgrade, value: number, cost: number, chanceMetPct: number = 0, metallics: number = 0, hoursPerUpgrade: number = 0) {
    this.upgrade = upgrade;
    this.value = value;
    this.cost = cost;
    this.chanceMetPct = chanceMetPct
    this.hoursPerUpgrade = hoursPerUpgrade
    this.metallics = metallics
  }

  upgradeName() {
    return Upgrade.name(this.upgrade)
  }

  upgradeShortName() {
    return Upgrade.shortName(this.upgrade)
  }

  valueStr() {
    switch (this.upgrade) {
      case Upgrade.MetallicLuck:
        return (Math.round(this.value) * 0.00001).toFixed(5) + '%'
      case Upgrade.CalcifyLuck:
        return Math.round(this.value*100) + '%'
      case Upgrade.GenSpeed:
        return this.value.toFixed(2) + '/s'
    }
  }

  toString() {
    return 'Get ' + this.upgradeName() + ' to ' + this.value + ' (' + this.cost + ' stones, ' + this.hoursPerUpgrade.toFixed(2) + ' hrs)'
  }
}
