import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { ProblemSetComponent } from '../problem-set/problem-set.component';
import { User } from "../service/model/user";
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subject = 'math';
  topic = 'sanjiaohanshu';

  constructor(private router: Router, global: GlobalsService, private userService: UserService) { }

  ngOnInit() {

  }
  
  check_record(){

  }

  logout(){
    this.userService.clearUser();
    this.toLogin();
  }

  toLogin(){
    this.router.navigate(['/', 'login']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
    console.log("logout");
  }

  start_problem(topic){
    this.router.navigate(['/problem-set', topic]).then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err) 
    });
  }

}
