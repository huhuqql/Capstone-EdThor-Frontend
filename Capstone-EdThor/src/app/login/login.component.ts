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

  myUser = new User();
  allUsers: User[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    // this.getUsers();
  }


  login() {
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

  seeAllUsers() {
    this.getUsers();
  }


  public getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.allUsers = users;
      console.log(this.allUsers);
    })
  }

  public addUser(): void {
    console.log(this.myUser);
    this.userService.saveUser(this.myUser).subscribe(
      (data) => {
        console.log(data);
        // this.myUser = new User();
        // console.log(this.myUser);
        this.getUsers();
      }
    )
  }

}
