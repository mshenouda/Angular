import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter} from '@angular/core';
import {ApiService } from '../services/api.service';

@Component({
  selector: 'app-select-email',
  templateUrl: './select-email.component.html',
  styleUrls: ['./select-email.component.scss']
})
export class SelectEmailComponent implements OnInit {
  
  @Input() label: string="";
  @Input() month: string="";
  @Output() outMonth: EventEmitter<any> = new EventEmitter<any>();   
  emails: number[]=[];
  value: number=0;
 

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  getEmails(month: string): any {
    // console.log("Day", day);
    this.apiservice.getEmails(month).subscribe({
      next: (month)=> {
        //console.log(employee[0].stats);
        this.emails = [...month[0].count];
      },
      error: (err: any)=> {console.error(err)},
      complete: () => console.log(`Fetched ${this.emails.length} employees for day ${month}`)  
    });
  }

  onMonthChange(value: number): void {
    let outMonth = {[this.month]: value};
    this.outMonth.emit(outMonth);
  }
}
