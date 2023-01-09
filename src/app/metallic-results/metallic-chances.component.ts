import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import Chart from "chart.js/auto";
import { Subscription } from "rxjs";
import { Egg } from "../egg.enum";
import { UpdateModeEnum } from "chart.js";
import { verticalLinePlugin } from "../chart-plugins";

@Component({
  selector: 'app-metallic-chances',
  templateUrl: './metallic-chances.component.html',
  styleUrls: ['./metallic-chances.component.css']
})
export class MetallicChancesComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['metallics', 'exactly', 'at-least']

  @ViewChild('chart') chartRef: ElementRef | undefined;
  private chart: Chart | undefined;
  private at_least_pts: number[] = []
  private exactly_pts: number[] = []
  private labels: number[] = []
  private readonly pts: number[][]

  private sub?: Subscription

  constructor(public dialog: MatDialog, public data: DataService) {
    this.pts = []
    for (let egg of Egg.all()) {
      this.pts.push([])
    }
  }

  get_max() {
    return Math.ceil(this.data.calc.metallics() * 4)
  }

  ngOnDestroy() {
    this.sub!.unsubscribe()
  }

  updateData() {
    this.labels.length = 0
    this.at_least_pts.length = 0
    this.exactly_pts.length = 0
    // @ts-ignore
    this.chart!.options.scales!['x']!.title.text = this.get_title()

    // let dists = this.data.calc.metallic_binomial_distribution()
    // for (let dist of dists) {
    //   if (dist.successes == 0) {
    //     continue
    //   }
    //   this.labels.push(dist.successes)
    //   this.exactly_pts.push(dist.exactly * 100.0)
    //   this.at_least_pts.push(dist.at_least * 100.0)
    // }

    for (let egg of Egg.all()) {
      this.pts[egg].length = 0  // clear points
      if (this.data.calc.total_eggs[egg] == 0) {
        this.chart!.getDatasetMeta(egg).hidden = true
        continue  // skip eggs that have 0 data points
      }
      this.chart!.getDatasetMeta(egg).hidden = false

      this.labels.length = 0
      let dists = this.data.calc.metallic_binomial_distribution_for_egg(egg)
      for (let dist of dists) {
        if (dist.successes == 0) {
          continue
        }
        this.labels.push(dist.successes)
        this.pts[egg].push(dist.at_least * 100.0)
      }
    }
  }

  get_title() {
    return 'Metallic Count (' + this.data.duration.toString() + ')'
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef!.nativeElement, {
      type: 'bar', // bar
      data: {
        labels: this.labels,
        datasets: [
          {
            label: Egg.name(Egg.Common),
            borderColor: '#F0F0F0',
            backgroundColor: '#F0F0F0',
            data: this.pts[Egg.Common]
          },
          {
            label: Egg.name(Egg.Uncommon),
            borderColor: '#6CFCBC',
            backgroundColor: '#6CFCBC',
            data: this.pts[Egg.Uncommon]
          },
          {
            label: Egg.name(Egg.Rare),
            borderColor: '#73B0FF',
            backgroundColor: '#73B0FF',
            data: this.pts[Egg.Rare],
          },
          {
            label: Egg.name(Egg.Epic),
            borderColor: '#BF76FF',
            backgroundColor: '#BF76FF',
            data: this.pts[Egg.Epic]
          },
          {
            label: Egg.name(Egg.Legendary),
            borderColor: '#FFCA75',
            backgroundColor: '#FFCA75',
            data: this.pts[Egg.Legendary]
          },
          {
            label: Egg.name(Egg.Prodigious),
            borderColor: '#FE8FBB',
            backgroundColor: '#FE8FBB',
            data: this.pts[Egg.Prodigious]
          },
          {
            label: Egg.name(Egg.Ascended),
            borderColor: '#88F9FE',
            backgroundColor: '#88F9FE',
            data: this.pts[Egg.Ascended]
          },
          {
            label: Egg.name(Egg.Mythical),
            borderColor: '#FF6363',
            backgroundColor: '#FF6363',
            data: this.pts[Egg.Mythical]
          },
          // {
          //   label: 'At Least',
          //   borderColor: '#9c27b0',
          //   backgroundColor: '#9c27b0',
          //   data: this.at_least_pts
          // },
          // {
          //   label: 'Exactly',
          //   borderColor: '#F0F0F0',
          //   backgroundColor: '#F0F0F0',
          //   data: this.exactly_pts
          // },
        ]
      },
      options: {
        animation: false,
        responsive: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        datasets: {
          line: {
            // pointHitRadius: 20,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBorderColor: 'white',
            fill: false
          }
        },
        scales: {
          x: {
            title: {
              color: 'white',
              display: true,
              text: 'Metallic Count' // this.get_x_axis_title()
            },
            ticks: {
              // maxTicksLimit: 10,
              color: 'white'
            },
            grid: {
              // color: '#585858',
              // tickColor: 'grey'
            }
            // type: 'time',
            // time: {
            //   unit: 'hour'
            // }
          },
          y: {
            min: 0,
            max: 100,
            ticks: {
              color: 'white',
              callback: (value, index, ticks) => {
                return value + '%'
              }
            },
            title: {
              color: 'white',
              display: true,
              text: 'Percent Chance'
            },
            grid: {
              color: '#585858',
              // tickColor: 'grey'
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
              filter: item => {
                return this.data.calc.total_eggs[item.datasetIndex!] > 0
              }
            }
          },
          tooltip: {
            position: 'average',
            callbacks: {
              label: (context) => {
                if (context.parsed.y !== null) {
                  return ' ' + context.parsed.y.toFixed(2) + '% Chance at least ' + (context.parsed.x + 1) + ' ' + context.dataset.label! + ' metallics'
                }
                return ''
              }
            }
          }
        }
      }
    })

    this.updateData()
    this.chart!.update(UpdateModeEnum.normal)

    this.sub = this.data.calculatorEvents.subscribe(() => {
      this.updateData()
      this.chart!.update(UpdateModeEnum.normal)
    })
  }
}
