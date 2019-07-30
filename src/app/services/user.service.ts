import { User } from './../components/user/user.component';
import { UserModel } from './../models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

@Injectable()
export default class UserService {

    User:Subject<UserModel> = new Subject();
    
    constructor(private http: Http) { 

    }
    
    private serverApi = 'http://localhost:3000/api';

    public getUserByMailAndPassword(mail: string, password: string) {
        const URI = `${this.serverApi}/users/${mail}/${password}`;
        return this.http.get(URI).pipe(map(res => res.json()));
    }

    public getUserByID(id: string) {
        const URI = `${this.serverApi}/users/${id}`;
        return this.http.get(URI).pipe(map(res => res.json()));
    }

    CreateOrUpdateUser(user: UserModel) {
        const URI = `${this.serverApi}/users`;
        this.http.post(URI, user).subscribe(response => {
            this.User.next(user);
        });
    }

    public getAllUsers() {
        const URI = `${this.serverApi}/users`;
        return this.http.get(URI).pipe(map(res => res.json()));
    }

    public deleteUsers(usersToDelete) {
        const URI = `${this.serverApi}/users`;
        return this.http.delete(URI, { body: {mails: usersToDelete}} ).pipe(map(res => res.json));
    }
}