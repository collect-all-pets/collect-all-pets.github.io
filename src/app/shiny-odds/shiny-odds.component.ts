import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import Chart from "chart.js/auto";
import { Subscription } from "rxjs";
import { Egg } from "../egg.enum";
import { verticalLinePlugin } from "../chart-plugins";
import { UpdateModeEnum } from "chart.js";

@Component({
  selector: 'app-shiny-odds',
  templateUrl: './shiny-odds.component.html',
  styleUrls: ['./shiny-odds.component.css']
})
export class ShinyOddsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') chartRef: ElementRef | undefined;
  private chart: Chart | undefined;
  private readonly pts: object[] = [{x:0,y:0}]
  private labels: any[] = []

  private sub?: Subscription

  constructor(public dialog: MatDialog, public data: DataService) {
  }

  ngOnDestroy() {
    this.sub!.unsubscribe()
  }

  updateData() {
    this.labels.length = 0  // clear labels
    this.pts.length = 0 // clear points
    for (let y=0; y < 100; y++) {
      let x = this.data.stats.eggs_for_shiny_pct(y)
      this.pts.push({x: x, y: y})
    }
    // this.chart!.options.scales!['x']!.max = Math.round(this.data.stats.eggs_for_shiny_pct(99))
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartRef!.nativeElement, {
      type: 'scatter',
      data: {
        // labels: this.labels,
        datasets: [
          {
            label: 'Hatches',
            borderColor: '#6CFCBC',
            backgroundColor: '#6CFCBC',
            data: this.pts
          },
        ]
      },
      options: {
        animation: false,
        showLine: true,
        responsive: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
        datasets: {
          scatter: {
            // pointHitRadius: 20,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBorderColor: 'white',
            fill: false
          }
        },
        scales: {
          x: {
            min: 0,
            max: 4500,  // stock odds produce 4603 for 99%
            title: {
              color: 'white',
              display: true,
              text: 'Hatches' // this.get_x_axis_title()
            },
            ticks: {
              count: 10,
              maxTicksLimit: 12,
              color: 'white',
              // callback: (value, index, ticks) => {
              //   return index / this.get_divisor() + this.get_x_axis_ticks()
              // }
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
              text: 'Chances of Getting a Shiny Pet'
            },
            grid: {
              color: '#585858',
              // tickColor: 'grey'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            position: 'nearest',
            callbacks: {
              label: (context) => {
                if (context.parsed.y !== null) {
                  return ' ' + context.parsed.y.toFixed(0) + '% Chance of a Shiny Pet in ' + context.parsed.x.toFixed(0) + ' hatches'
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
