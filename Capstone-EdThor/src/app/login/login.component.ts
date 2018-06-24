import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../service/model/user";
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  curUser = new User();
  allUsers: User[] = [];
  page: number = 0;
  register_password: string[] = [];
  register_username: string;
  warning_display: boolean = false;
  message_display: boolean = false;
  warning: string = "";
  message: string = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(this.userService.getStudentId() != -1){
      this.toDashboard();
    }
  }


  login() {
    this.userService.getUser(this.curUser).subscribe(
      (data) => {
        if(data == -1){
          this.warning = "用户名或密码错误！";
          this.warning_display = true;
        }
        else{
          this.userService.setStudentId(data);
          this.userService.setUsername(this.curUser.username);
          this.userService.setPassword(this.curUser.password);
          console.log(this.userService.my_user);
          this.toDashboard();
        }
      })
  }

  toDashboard(){
    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
    console.log("login");
  }

  register() {
    this.addUser();
  }

  switchPage() {
    if (this.page == 0) {
      this.page = 1;
    }
    else {
      this.page = 0;
    }
  }


  public getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.allUsers = users;
      console.log(this.allUsers);
    })
  }

  public addUser(): void {
    if (this.register_password[0] != this.register_password[1]) {
      this.warning = "错误！两次输入的密码不同";
      this.warning_display = true;
    }
    else {
      let newUser = new User();
      newUser.username = this.register_username;
      newUser.password = this.register_password[0];
      this.userService.saveUser(newUser).subscribe(
        (data) => {
          if (data == -1) {
            this.warning = "抱歉！该用户名已被注册";
            this.warning_display = true;
          }
          else {
            this.warning = "";
            this.warning_display = false;
            this.message = "注册成功！";
            this.message_display = true;
            this.switchPage();
          }
        }
      )
    }
  }

}
