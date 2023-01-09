// Code converted from similar named functions in https://github.com/thisancog/statistics.js
// but simplified to reduce overhead and be used in a static and type-safe manner

export class Statistics {
  static binomialProbabilityMass(k: number, n: number, probability: number) {
    return Statistics.binomialCoefficient(n, k) * Math.pow(probability, k) * Math.pow(1 - probability, n - k);
  }

  static binomialCoefficient(n: number, k: number) {
    let factors: number[] = [];
    for (let i = 1; i <= k; i++) {
      factors.push((n + 1 - i) / i);
    }
    return Statistics.product(factors);
  }

  static product(data: number[]) {
    return data.reduce((a, b) => { return (Statistics.isNumeric(b)) ? (a * b) : a; }, 1);
  }

  static isNumeric(n: any) {
    return (typeof n !== 'undefined') ? !Array.isArray(n) && !isNaN(parseFloat(n)) && isFinite(n) : undefined;
  }
}
