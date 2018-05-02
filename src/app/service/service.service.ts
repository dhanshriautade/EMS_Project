import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from 'environments/environment.prod';
import { Session } from 'app/service/session.session';
import { Router } from '@angular/router';

@Injectable()
export class Services {
    public token: string;
    private http: Http = null;
    constructor( @Inject(Http) http: Http, private session: Session, private router: Router) {
        this.http = http;
        this.token = this.session.getToken();
        if (this.token == null && this.token == undefined) {
            this.router.navigate(['login']);
        }
    }
    // register student
    registerStudent(param: any): Observable<any> {
        return this.http.request(environment.registerStudent, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // get student by email
    getStudentByEmail(email): Observable<any> {
        return this.http.request(environment.getStudent, {
            body: email,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // todo events of  user
    assignStudents(param: any, id): Observable<any> {
        return this.http.request(environment.updateAssignedStudents + '/' + id, {
            body: param,
            method: "put",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // assigned students
    getAssignedStudents(id): Observable<any> {
        return this.http.request(environment.getAssignedStudents + '/' + id, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }
    // todo events of  user
    AddToDo(param: any): Observable<any> {
        return this.http.request(environment.todo, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // todo events of  user
    getToDo(): Observable<any> {
        return this.http.request(environment.todo, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // calender events of  user
    AddCalenderEvents(param: any): Observable<any> {
        return this.http.request(environment.calenderEvent, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // calender events of  user
    getCalenderEvents(): Observable<any> {
        return this.http.request(environment.calenderEvent, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // get all students;
    getStudents(filters): Observable<any> {
        return this.http.request(environment.getStudentList + '/' + filters, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // upload student list by HR
    uploadStudentList(param: any): Observable<any> {
        return this.http.request(environment.uploadStudentList, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // upload student list by HR
    updateStudent(param: any): Observable<any> {
        return this.http.request(environment.uploadStudentList + '/' + param._id, {
            body: param,
            method: "put",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // delete user
    deleteEmployee(param: any): Observable<any> {
        return this.http.request(environment.register + '/' + param, {
            method: "delete",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    //register user
    register(param: any): Observable<any> {
        return this.http.request(environment.register, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    // activate user
    activateEmployee(param: any): Observable<any> {
        return this.http.request(environment.activate + '/' + param._id, {
            body: param,
            method: "put",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    //authenticate user
    authenticate(param: any): Observable<any> {
        return this.http.request(environment.authenticate, {
            body: param,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }
    //Send Email
    sendMail(data): Observable<any> {
       console.log('data',data);
        return this.http.request(environment.sendMail, {
            body: data,
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }

    //get all users/ employees
    getAllEmployees(): Observable<any> {
        return this.http.request(environment.getAllEmployees, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }
        //get SMS
        testtwilio(SMS): Observable<any> {
            return this.http.request(environment.testtwilio, {
                method: "get",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                })
            }).map((response) => {
                return JSON.parse(response.text());
            }, (error) => {
                return null
            });
        }
    
    

    // get user/ employee
    getEmployeeById(param): Observable<any> {
        return this.http.request(environment.getEmployee + '/' + param, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            })
        }).map((response) => {
            return JSON.parse(response.text());
        }, (error) => {
            return null
        });
    }
}