import { Injectable } from '@angular/core';
import { User } from "./model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  my_user: User = {
    student_id: 1
  }

  constructor() { 
    
  }

  getUser(){

  }

  getStudentId(){
    return this.my_user.student_id;
  }
}
