import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../user';

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
}