import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {SelectComponent} from '../select/select.component';

import * as Chartist from 'chartist';
import { ValueScope } from 'ajv/dist/compile/codegen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(SelectComponent, {static: false})
  select: SelectComponent;
  constructor() { }
 
  bugs = [
    'Sign contract for "What are conference organizers afraid of?',
    "Lines From Great Russian Literature? Or E-mails From My Boss?",
    "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    "Create 4 Invisible User Experiences you Never Knew About"];
  
  websites = ["Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            "Sign contract for 'What are conference organizers afraid of?'"];

  servers = ["Lines From Great Russian Literature? Or E-mails From My Boss?", 
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit", 'Sign contract for "What are conference organizers afraid of?"'];          

  closeBugsFlags = this.bugs.map(x=>false);
  closeWebsitesFlags = this.websites.map(x=>false);
  closeServersFlags = this.servers.map(x=>false);
  editBugFlag: string=""; 
  items=[1, 2, 3];
  days= ['Item','M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
  months= ['Item','J', 'F', 'M', 'A', 'M', 'J', 'J','A', 'S', 'O', 'N', 'D'];
  tasks= ['Item', '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'];
  // [230, 750, 450, 300, 280, 240, 200, 190]

  selectedDays: any = {'M': -1, 'T': -1, 'W': -1, 'Th': -1, 'F': -1, 'S': -1, 'Su':-1};
  selectedMonths: any = {'J': -1, 'F': -1, 'M': -1, 'A': -1, 'Y': -1, 'U': -1, 'L': -1,'G': -1, 'S': -1, 'O': -1, 'N': -1, 'D': -1};
  selectedTasks: any = {'12p': -1, '3p': -1, '6p': -1, '9p': -1, '12p2': -1, '3a': -1, '6a': -1, '9a': -1};
  errorSubmit: boolean = false;
  series: any[] = [];

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
  }

  closeBugs(i: number, bug: string){
    this.closeBugsFlags[i] = true;
  }
  
  editBugs(i: number, bug: string) {
    this.editBugFlag = this.bugs[i].toLocaleUpperCase();
    console.log(i, this.editBugFlag);
  }

  closeWebsites(i: number, bug: string){
    this.closeWebsitesFlags[i] = true;
  }

  closeServers(i: number, bug: string){
    this.closeServersFlags[i] = true;
  }

  onRecieve(data: any): void {
    this.errorSubmit = false;
    const [key, value] = Object.entries(data)[0];
    this.selectedDays[key] = value;
  }
  
  onDailySalesSubmit(): void {
    this.errorSubmit = false;
    for(const value of Object.values(this.selectedDays))
      if (value == -1)
      {
        this.errorSubmit = true;
        break;
      }
    console.log(this.errorSubmit);
    this.series = [...Object.values(this.selectedDays)];
    this.doDailySalesChart();  
  }

  onEmailSubscriptionSubmit(): void {
    this.doEmailSubscription();
  }

  onCompletedTasksSubmit(): void {
    this.doDataCompletedTasks();
  }

  doDailySalesChart(): void {
     /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
     const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'],
      series: [this.series],
     };
     
      const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }
    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);
  }

  doEmailSubscription(): void {
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

  doDataCompletedTasks(): void {  
      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
      const dataCompletedTasksChart: any = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }

}

