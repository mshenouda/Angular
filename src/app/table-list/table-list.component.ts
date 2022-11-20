import { Component, OnInit, ViewChild } from '@angular/core';
import * as e from 'express';
import { content_v2_1 } from 'googleapis';
import {ApiService} from '../services/api.service';
import {User} from '../user';

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
  user: User;

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
      console.log(user);
    if (this.user)
      this.apiservice.editUser(this.id, user).subscribe();
    else { 
      this.apiservice.addUser(user).subscribe({
        next: (x) => this.users.push(x),
        error: (err: any) => console.log('Failed to add new user'),
        complete: ()=>console.log("Successfully added new user")});
    }
    //callback to maintain json.db data sync
    setTimeout(()=> this.getUsers(), 200);
  }
 
  

  addUser() {
    this.showForm = true;
    this.id = (this.users.length > 0) ? this.users[this.users.length-1].id + 1: 1;
    this.user = null;
  }

  editUser(data: User) {
    this.showForm = true;
    let index = this.users.indexOf(data);
    this.user = this.users[index];
    this.id = this.user.id;
  }
  
  deleteUser(id: number) {
    if (this.users.length>0) {
      this.users= this.users.filter(user=>user.id != id);
      if (this.users.length == 0) {
        console.log("users now", this.users);  
        this.user = null;
      }
      this.apiservice.deleteUser(id).subscribe();
    } 
  }
}

