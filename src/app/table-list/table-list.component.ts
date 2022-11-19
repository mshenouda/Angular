import { Component, OnInit, ViewChild } from '@angular/core';
import { content_v2_1 } from 'googleapis';
import {ApiService} from '../services/api.service';
import {User} from '../user';
import { AddEditUserComponent } from 'app/add-edit-user/add-edit-user.component';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select/select';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  // providers: [ApiService],
})
export class TableListComponent implements OnInit {
  tableName: string = "UserList";
  id: number;
  users: User[] = [];
  showForm: boolean = false;
  eUser: User;
  addEnable: boolean = false;
  editEnable: boolean = false;

  constructor(private apiservice: ApiService) { 
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() 
  {
    //1st method to retrieve an observable from a service file
    //this.users = this.apiservice.users;

    //2nd method for dumping an observable using subscribe method
    this.apiservice.getUsers().subscribe({
      next: (x) => {
        this.users = [...x], 
        console.log("users", this.users)
      },
      error: (err: any)=> console.error(err),
      complete: () => console.log(`Fetched ${this.users.length} users`)});
  }
  
  onRecieve(data: User) {
    this.showForm = false;
    let user = {...data};
    if(this.editEnable) {
      console.log(user);
      this.editEnable = false;
      this.apiservice.editUser(this.id, user).subscribe();
    } 
    
    if(this.addEnable) {
      this.addEnable = false;
      this.apiservice.addUser(user).subscribe({
        next: (x) => this.users.push(x),
        error: (err: any) => console.log('Failed to add new user'),
        complete: ()=>console.log("Successfully added new user")});
    }

    //callback to maintain json.db data sync 
    setTimeout(()=>this.getUsers(), 200);
  }

  addUser() {
    this.showForm = true;
    if (this.users.length > 0) {
      this.id = this.users[this.users.length-1].id + 1;
    } else {
      this.id = 1;
    }
    this.addEnable = true;   
  }

  editUser(data: User) {
    this.showForm = true;
    let index = this.users.indexOf(data);
    this.eUser = this.users[index];
    this.id = this.eUser.id;
    this.editEnable = true;
    this.addEnable = false; 
  }
  
  deleteUser(id: number) {
    if (this.users.length>0) {
      this.users= this.users.filter(x=>x.id != id);
      console.log(this.users);
      this.apiservice.deleteUser(id).subscribe();
    } 
    else {
      console.log("Can't removed from empty list")
      this.addEnable = false;
      this.editEnable = false;
    } 
  }

}

