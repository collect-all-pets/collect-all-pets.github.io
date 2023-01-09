import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {
  decimalPipe = new DecimalPipe('en-US')  // todo: support other locales

  transform(input: any, args?: any): any {
    if (Number.isNaN(input)) {
      return NaN
    } else if (!Number.isFinite(input)) {
      return '∞'
    }

    let suffixes = ['k', 'M', 'B', 'T', 'Q']
    let val = input
    let suffix = ''

    if (input >= 1000) {
      let exp = Math.floor(Math.log(input) / Math.log(1000))
      val = (input / Math.pow(1000, exp))
      suffix = ' ' + suffixes[exp - 1]
    }

    // we want 3 total digits
    if (val >= 100) {
      // ex: 905 k
      return this.decimalPipe.transform(val, '1.0-0') + suffix
    } else if (val >= 10) {
      // ex: 90.5 M
      return this.decimalPipe.transform(val, '1.0-1') + suffix
    } else {
      // ex: 9.05 M
      return this.decimalPipe.transform(val, '1.0-2') + suffix
    }
  }
}

@Pipe({
  name: 'short2'
})
export class ShortPipe2 implements PipeTransform {
  decimalPipe = new DecimalPipe('en-US')  // todo: support other locales

  transform(input: any, args?: any): any {
    if (Number.isNaN(input)) {
      return NaN
    } else if (!Number.isFinite(input)) {
      return '∞'
    }

    let suffixes = ['k', 'M', 'B', 'T', 'Q']
    let val = input
    let suffix = ''

    if (input >= 1000) {
      let exp = Math.floor(Math.log(input) / Math.log(1000))
      val = (input / Math.pow(1000, exp))
      suffix = ' ' + suffixes[exp - 1]
    }

    // we want 4 total digits
    if (val >= 100) {
      // ex: 905 k
      return this.decimalPipe.transform(val, '1.0-1') + suffix
    } else if (val >= 10) {
      // ex: 90.5 M
      return this.decimalPipe.transform(val, '1.0-2') + suffix
    } else {
      // ex: 9.05 M
      return this.decimalPipe.transform(val, '1.0-3') + suffix
    }
  }
}

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {
  decimalPipe = new DecimalPipe('en-US')  // todo: support other locales

  transform(input: any, args?: any): any {
    if (Number.isNaN(input)) {
      return NaN
    } else if (!Number.isFinite(input)) {
      return '∞'
    }

    let val = input
    if (input >= 1000) {
      let exp = Math.floor(Math.log(input) / Math.log(1000))
      val = (input / Math.pow(1000, exp))
    }

    // we want 3 total digits
    if (val >= 100) {
      return this.decimalPipe.transform(val, '1.0-0')
    } else if (val >= 10) {
      return this.decimalPipe.transform(val, '1.0-1')
    } else {
      return this.decimalPipe.transform(val, '1.0-2')
    }
  }
}

@Pipe({
  name: 'shortSuffix'
})
export class ShortSuffixPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    if (Number.isNaN(input) || !Number.isFinite(input)) {
      return ''
    }

    let suffixes = ['k', 'M', 'B', 'T', 'Q']
    let suffix = ''

    if (input >= 1000) {
      let exp = Math.floor(Math.log(input) / Math.log(1000))
      suffix = suffixes[exp - 1]
    }
    return suffix
  }
}

