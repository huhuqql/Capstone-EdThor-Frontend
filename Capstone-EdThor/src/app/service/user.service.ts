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
    student_id: 1,
    username: 'haha',
    password: '',
    pseudoname: ''
  }

  private baseUrl: string;

  constructor(private httpService: HttpClient) {
    this.baseUrl = environment.base_url + "/ws/users";
  }

  public clearUser(){
    this.my_user.username = '';
    this.my_user.password = '';
    this.my_user.pseudoname = '';
    this.my_user.student_id = -1;
  }

  public getUsername(){
    return this.my_user.username;
  }

  public getStudentId() {
    return this.my_user.student_id;
  }

  public setStudentId(student_id){
    this.my_user.student_id = student_id;
  }

  public setUsername(username){
    this.my_user.username = username;
  }

  public setPassword(password){
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
