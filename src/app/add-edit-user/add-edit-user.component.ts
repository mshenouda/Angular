import { Component, OnInit, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import {User} from '../user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {


  constructor() { }
  @Input() id: number=0;
  @Input() user: User;
  @Output() newUserAdded: EventEmitter<User> = new EventEmitter<User>();
  firstname: string="";
  country: string="";
  city: string="";
  salary: number=0;
  ngOnInit(): void {
    if (this.user) {
      this.firstname = this.user.name;
      this.country = this.user.country;
      this.city = this.user.city;
      this.salary = this.user.salary;  
    } 
  }
  

  // profileForm = new FormGroup({
  //   firstname: new FormControl("", Validators.required),
  //   lasttname: new FormControl("", Validators.required),
  //   country: new FormControl("", Validators.required),
  //   city: new FormControl("", Validators.required),
  //   salary: new FormControl("", Validators.required),
  // });
  
  newUser(firstname: string, country: string, city: string, salary: number) {
    let tmpUser = {"id": this.id, "name": firstname, "country": country, "city": city, "salary": salary};
    this.newUserAdded.emit(tmpUser);
  }

  onSubmit(form: HTMLFormElement){
    this.firstname = form.value.firstname;
    this.country = form.value.country;
    this.city = form.value.city;
    this.salary =  form.value.salary;
    console.log(this.id, form);
    this.newUser(this.firstname, this.country, this.city, this.salary);
    form.reset();
  }
}

