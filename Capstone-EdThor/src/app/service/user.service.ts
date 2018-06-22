import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Member } from "./model/member";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  my_user: User = {
    student_id: -1,
    username: '',
    password: '',
    pseudoname: ''
  }

  private baseUrl: string;

  constructor(private httpService: HttpClient) {
    this.baseUrl = environment.base_url + "/ws/users";
  }

  getUser() {

  }

  getStudentId() {
    return this.my_user.student_id;
  }

  public getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(this.baseUrl);
  }

  public saveUser(u: User): Observable<User> {
    return this.httpService.post<User>(this.baseUrl + '/register', u);
  }
}
