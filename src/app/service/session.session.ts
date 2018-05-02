import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class Session {
    private http: Http = null;
    constructor( @Inject(Http) http: Http, private _router: Router) {
        this.http = http;
    }

    createSession(data: any, token: any) {
        sessionStorage.setItem("id", data._id);
        sessionStorage.setItem("name", data.FullName);
        sessionStorage.setItem("profileUrl", data.profileUrl);
        sessionStorage.setItem("role", '' + data.Role);
        sessionStorage.setItem("email", data.Email);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("events", JSON.stringify(data.calenderEvents));
        sessionStorage.setItem("todo", JSON.stringify(data.todoList));
    }
    getToDoList() {
        return sessionStorage.getItem('todo');
    }
    getEvents() {
        return sessionStorage.getItem('events');
    }
    getId() {
        return sessionStorage.getItem('id');
    }
    getName() {
        return sessionStorage.getItem('name');
    }
    getProfilePic() {
        return sessionStorage.getItem('profileUrl');
    }
    getRole() {
        if (sessionStorage.getItem('role') == '2') {
            return "Tele Caller";
        } else if (sessionStorage.getItem('role') == '1') {
            return "Admin";
        } else {
            return "Unknows";
        }
    }
    getToken() {
        return sessionStorage.getItem('token');
    }
    clear() {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('profilePic');
        sessionStorage.removeItem('roleId');
        sessionStorage.removeItem('email');
        this._router.navigate(['login']);
    }
}