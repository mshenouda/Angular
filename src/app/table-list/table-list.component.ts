import { Component, OnInit } from '@angular/core';
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
  id: Number;
  name: String; 
  country: string;
  city: string;
  salary: Number;
  users: User[] = [];
  aUser: User;
  newUsers = [{}] 

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
    this.apiservice.getUsers().subscribe(
      x => this.users = [...x],
    //   //to retrieve an individual observable item.
    //   //x => {this.aUser = x; console.log(this.aUser);},
      error=> console.error(error),
      () => console.log(`Fetched ${this.users.length} users`)
      
    );

    //3rd method for dumping an observable without subscribe method using callbacks 
    //Some issue with rendering the html page using this method
    // this.apiservice.getUsers().subscribe({
    //   next(x: User[]){return this.users = [...x]; },
    //   error(err) {console.error(err)},
    //   complete() {console.log(`Fetched ${this.users.length} users`)}
    // });
  }
  
  addUser() {
    let l = (this.users.length > 0) ? this.users[this.users.length-1].id + 1: 1;
    let user: User = {"id": l, "name": `${'mina'+l.toString()}`, "country": "Egypt", "city": "Cairo", "salary": l*1000};
    console.log(user);
    this.apiservice.addUser(user).subscribe(
      x => this.users.push(x),
      error => console.log('Failed to add new user'),
      ()=>console.log("Successfully added new user") 
    );
  }

  editUser(user: User) {
    let index = this.users.indexOf(user);
    user = this.users[index];
    let id = user.id;
    user = {"id": user.id+2, "name": user.name+'*', "country": "USA", "city": "Cairo", "salary": user.salary+1000} 
    console.log(user);
    this.apiservice.editUser(id, user).subscribe();
    this.getUsers();
  }

  deleteUser(id: number) {
    if (this.users.length) {
      this.users= this.users.filter(x=>x.id != id);
      console.log(this.users);
    } else {
      console.log("Can't remove from empty list");
    } 
    this.apiservice.deleteUser(id).subscribe();
  }

}

