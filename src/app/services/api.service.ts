import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../user';
import {Employee} from '../employee';
import {MonthEmail} from '../month-email';
import {Task} from '../task';


@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}  
    
    //GET METHOD
    getUsers(): Observable<User[]> {
        //using from method
        //return from(this.users);            
        
        //using of method
        // return of(this.users);

        return this.http.get<User[]>("http://localhost:3000/users");
    }

    //POST METHOD
    addUser(user: User): Observable<User> {
        return this.http.post<User>("http://localhost:3000/users/", user);
    }
    //DELETE METHOD
    deleteUser(id: Number): Observable<User> {
        let url = `http://localhost:3000/users/${id}`;
        return this.http.delete<User>(url);
    }

    //EDIT METHOD
    editUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`http://localhost:3000/users/${id}`, user);
    }

    //GET EMPLOYEES
    getEmployees(day: string): Observable<Employee> {  
        return this.http.get<Employee>(`http://localhost:3000/employees?day=${day}`);
    }

    //GET EMAILS
    getEmails(month: string): Observable<MonthEmail> {
        return this.http.get<MonthEmail>(`http://localhost:3000/emails?month/${month}`);
    }
    
    //GET Tasks
    getTasks(label: string): Observable<Task> {
        return this.http.get<Task>(`http://localhost:3000/tasks?label/${label}`);
    }   
}