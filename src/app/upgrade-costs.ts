import { Constants } from "./constants";

const oneBillion: number = 1000000000

const metallicCosts = [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 7500]

export class MetallicCosts {
  // returns the cost of the upgrade to get to specified metallic luck
  static for(upgrades?: number): number {
    let num = Math.round(upgrades!)
    if (num > Constants.maxMetallicUpgrades || num <= 0) {
      return NaN
    }
    if (num < metallicCosts.length) {
      return metallicCosts[num]
    }
    return 10000
  }

  // returns the cost of the next upgrade to metallic luck
  static next(current?: number): number {
    return this.for(current! + Constants.metallicUpgradeIncrease)
  }
}

export class ShinyLuckCosts {
  // returns the cost of the upgrade to get to specified shiny wall luck
  static for(luck?: number): number {
    if (luck! > Constants.maxShinyWallLuck || luck! <= 1) {
      return NaN
    }
    // 1 billion gold for every 0.01 multiplier
    return Math.round((luck! - 1) * 100 * oneBillion)
  }

  // returns the cost of the next upgrade to metallic luck
  static next(current?: number): number {
    return this.for(current! + Constants.shinyLuckIncrease)
  }
}

export class GenSpeedCosts {
  // returns the cost of the upgrade to get to specified gen speed
  static for(speed: number): number {
    // todo: this is a bit hacky
    return this.next(speed - Constants.genSpeedIncrease)
  }

  // returns the cost of the next upgrade to gen speed
  static next(current: number): number {
    if (current >= Constants.maxGenSpeed || current <= 0) {
      return NaN
    }
    if (current < 1.00) {
      // note: this is an approximation I came up with. It was missing from the farzz code
      return Math.round((current-0.25)/0.75*40.0+10.0)
    } else if (current < 2.01 && current >= 1.00) {
      return Math.round((current * 50) + ((current - 1) * 150))
    } else if (current < 3.01 && current >= 2.00) {
      if (Math.ceil(current * 100) % 2 == 0) {
        return Math.round((current * 125) + ((current - 2) * 1125))
      } else {
        return Math.round(((current - 0.01) * 125) + (((current - 0.01) - 2) * 1125) + 13)
      }
    } else if (current < 4.01 && current >= 3.00) {
      return Math.round((current * 500) + ((current - 3) * 4000))
    } else if (current < 5.01 && current >= 4.00) {
      return Math.round((current * 1500) + ((current - 4) * 3500))
    }
    // todo: unknown
    console.log('Unable to determine stone cost of gen speed: ' + current)
    return NaN
  }
}

export class CalcificationCosts {
  // returns the cost of the upgrade to get to specified calcification luck
  static for(percent: number): number {
    return this.next(percent - Constants.calcifyIncrease)
  }

  // returns the cost of the next upgrade to calcification luck
  static next(current: number): number {
    if (current >= Constants.maxCalcify) {
      return NaN
    }
    let calcLuck = current / 100.0
    if (calcLuck < 0.5) {
      return (calcLuck * 5000) + 50
    } else if (calcLuck <= 1) {
      return ((calcLuck - 0.5) * 10000) + 2600
    }
    // todo: unknown
    console.log('Unable to determine stone cost of calcification luck: ' + current + '%')
    return NaN
  }
}

