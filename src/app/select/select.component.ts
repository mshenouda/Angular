import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter} from '@angular/core';
import {ApiService } from '../services/api.service';
import { Employee } from 'app/employee';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {


  constructor(private apiservice: ApiService) { }
  @Input() label: string="";
  @Input() day: string="";
  @Input() month: string="";
  @Input() task: string="";
  @Output() outDay: EventEmitter<any> = new EventEmitter<any>();
  @Output() outMonth: EventEmitter<any> = new EventEmitter<any>();
  @Output() outTask: EventEmitter<any> = new EventEmitter<any>();
  
  employees: number[]=[];
  value: number=0;
  
  ngOnInit(): void {
    this.getEmployees(this.day);
  }

  getEmployees(day: string): any {
    // console.log("Day", day);
    this.apiservice.getEmployees(day).subscribe({
      next: (employee)=> {
        //console.log(employee[0].stats);
        this.employees = [...employee[0].values];
      },
      error: (err: any)=> {console.error(err)},
      complete: () => console.log(`Fetched ${this.employees.length} employees for day ${day}`)  
    });
  }

  onDayChange(value: number): void {
    let outDay = {[this.day]: value};
    this.outDay.emit(outDay);
  }

  onMonthChange(value: number): void {
    let outMonth = {[this.day]: value};
    this.outMonth.emit(outMonth);
  }

  onTaskChange(value: number): void {
    let outTask = {[this.day]: value};
    this.outMonth.emit(outTask);
  }
}
