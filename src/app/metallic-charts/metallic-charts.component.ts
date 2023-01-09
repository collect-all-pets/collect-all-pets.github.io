import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import { Subscription } from "rxjs";
import { UpdateModeEnum } from "chart.js/dist/types";
import { Egg } from "../egg.enum";
import { verticalLinePlugin } from "../chart-plugins"

@Component({
  selector: 'app-metallic-charts',
  templateUrl: './metallic-charts.component.html',
  styleUrls: ['./metallic-charts.component.css']
})
export class MetallicChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') chartRef: ElementRef | undefined;
  private chart: Chart | undefined;
  private readonly pts: number[][]
  private labels: any[] = []

  private sub?: Subscription

  constructor(public dialog: MatDialog, public data: DataService) {
    this.pts = []
    for (let egg of Egg.all()) {
      this.pts.push([])
    }
    // total column
    this.pts.push([])
  }

  ngOnDestroy() {
    this.sub!.unsubscribe()
  }

  get_max(): number {
    return this.data.cfg.met_chart_use_days ? this.data.cfg.met_chart_days : this.data.cfg.met_chart_hours
  }

  get_increment(): number {
    return this.data.cfg.met_chart_use_days ? 0.25 : 1
  }

  get_x_axis_title() {
    return this.data.cfg.met_chart_use_days ? 'Days' : 'Hours'
  }

  get_label_suffix() {
    return this.data.cfg.met_chart_use_days ? ' Days' : ' Hours'
  }

  get_x_axis_ticks() {
    return this.data.cfg.met_chart_use_days ? ' days' : ' hrs'
  }

  updateData() {
    this.labels.length = 0  // clear labels
    for (let i = 0; i <= this.get_max(); i += this.get_increment()) {
      // this.labels.push(i.toString() + (this.data.cfg.met_chart_use_days ? ' d' : ' hr'))
      this.labels.push(i.toString() + this.get_label_suffix())
    }
    for (let egg of Egg.all()) {
      this.pts[egg].length = 0  // clear points
      if (this.data.calc.total_eggs[egg] == 0) {
        this.chart!.getDatasetMeta(egg).hidden = true
        continue  // skip eggs that have 0 data points
      }
      this.chart!.getDatasetMeta(egg).hidden = false

      for (let i = 0; i <= this.get_max(); i += this.get_increment()) {
        let hours = this.data.cfg.met_chart_use_days ? 24 * i : i
        this.pts[egg].push(this.data.stats.chance_of_metallic_pct_for_egg(egg, hours * (this.data.calc.total_eggs[egg] / this.data.duration.total_hours())))
      }
    }
    this.pts[Egg.Mythical+1].length = 0  // clear points
    for (let i = 0; i <= this.get_max(); i += this.get_increment()) {
      let hours = this.data.cfg.met_chart_use_days ? 24 * i : i
      let p = this.data.calc.adj_chance_of_metallic_pct_for_scale(hours/this.data.duration.total_hours())
      this.pts[Egg.Mythical+1].push(p)
      // console.log('p(' + i + ') = ' + p)
    }
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef!.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Common',
            borderColor: '#F0F0F0',
            backgroundColor: '#F0F0F0',
            data: this.pts[Egg.Common]
          },
          {
            label: 'Uncommon',
            borderColor: '#6CFCBC',
            backgroundColor: '#6CFCBC',
            data: this.pts[Egg.Uncommon]
          },
          {
            label: 'Rare',
            borderColor: '#73B0FF',
            backgroundColor: '#73B0FF',
            data: this.pts[Egg.Rare],
          },
          {
            label: 'Epic',
            borderColor: '#BF76FF',
            backgroundColor: '#BF76FF',
            data: this.pts[Egg.Epic]
          },
          {
            label: 'Legendary',
            borderColor: '#FFCA75',
            backgroundColor: '#FFCA75',
            data: this.pts[Egg.Legendary]
          },
          {
          label: 'Prodigious',
          borderColor: '#FE8FBB',
          backgroundColor: '#FE8FBB',
          data: this.pts[Egg.Prodigious]
        },
          {
            label: 'Ascended',
            borderColor: '#88F9FE',
            backgroundColor: '#88F9FE',
            data: this.pts[Egg.Ascended]
          },
          {
            label: 'Mythical',
            borderColor: '#FF6363',
            backgroundColor: '#FF6363',
            data: this.pts[Egg.Mythical]
          },
          {
            label: 'Any',
            borderColor: '#9c27b0',
            backgroundColor: '#9c27b0',
            data: this.pts[Egg.Mythical+1]
          },
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
              text: 'Time' // this.get_x_axis_title()
            },
            ticks: {
              maxTicksLimit: 10,
              color: 'white',
              callback: (value, index, ticks) => {
                return index / this.get_divisor() + this.get_x_axis_ticks()
              }
            },
            grid: {
              color: '#585858',
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
              text: 'Chances of Getting a Metallic'
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
                return item.datasetIndex! === Egg.Mythical+1 || this.data.calc.total_eggs[item.datasetIndex!] > 0
              }
            }
          },
          tooltip: {
            position: 'nearest',
            callbacks: {
              label: (context) => {
                if (context.parsed.y !== null) {
                  return ' ' + context.parsed.y.toFixed(1) + '% Chance of a ' + context.dataset.label! + ' Metallic'
                }
                return ''
              }
            }
          }
        }
      },
      plugins: [verticalLinePlugin]
    })

    this.updateData()

    this.chart!.update(UpdateModeEnum.normal)

    this.sub = this.data.calculatorEvents.subscribe(() => {
      this.updateData()
      this.chart!.update(UpdateModeEnum.normal)
    })
  }

  private get_divisor() {
    return this.data.cfg.met_chart_use_days ? 4 : 1
  }
}
