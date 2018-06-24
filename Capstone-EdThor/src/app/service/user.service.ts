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

  clearUser(){
    this.my_user.username = '';
    this.my_user.password = '';
    this.my_user.pseudoname = '';
    this.my_user.student_id = -1;
  }

  getStudentId() {
    return this.my_user.student_id;
  }

  setStudentId(student_id){
    this.my_user.student_id = student_id;
  }

  setUsername(username){
    this.my_user.username = username;
  }

  setPassword(password){
    this.my_user.password = password;
  }

  public getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(this.baseUrl);
  }

  public saveUser(u: User): Observable<number> {
    return this.httpService.post<number>(this.baseUrl + '/register', u);
  }

  public getUser(u: User): Observable<number> {
    return this.httpService.post<number>(this.baseUrl + '/login', u);
  }
}
