import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter} from '@angular/core';
import {ApiService } from '../services/api.service';

@Component({
  selector: 'app-select-task',
  templateUrl: './select-task.component.html',
  styleUrls: ['./select-task.component.scss']
})
export class SelectTaskComponent implements OnInit {
  
  @Input() label: string="";
  @Input() task: string="";
  @Output() outTask: EventEmitter<any> = new EventEmitter<any>();
  tasks: number[]=[];
  value: number=0;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  getTasks(task: string): any {
    // console.log("Day", day);
    this.apiservice.getTasks(task).subscribe({
      next: (task)=> {
        //console.log(employee[0].stats);
        this.tasks = [...task[0].value];
      },
      error: (err: any)=> {console.error(err)},
      complete: () => console.log(`Fetched ${this.tasks.length} tasks for task ${task}`)  
    });
  }

  onTaskChange(value: number): void {
    let outTask = {[this.task]: value};
    this.outTask.emit(outTask);
  }
}
