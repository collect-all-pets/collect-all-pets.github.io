// https://stackoverflow.com/a/45172506
// https://stackoverflow.com/a/74458631
export const verticalLinePlugin = {
  id: 'verticalLiner',
  afterInit: (chart: any, args: any, opts: any) => {
    chart.verticalLiner = {}
  },
  afterEvent: (chart: any, args: any, options: any) => {
    const {inChartArea} = args
    chart.verticalLiner = {draw: inChartArea}
  },
  beforeTooltipDraw: (chart: any, args: any, options: any) => {
    const {draw} = chart.verticalLiner
    if (!draw) return

    const {ctx} = chart
    const {top, bottom} = chart.chartArea
    const {tooltip} = args
    const x = tooltip?.caretX
    if (!x) return

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, top)
    ctx.lineTo(x, bottom)
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke()
    ctx.restore()
  }
}
