import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import { ProblemSetComponent } from '../problem-set/problem-set.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subject = 'math';
  topic = 'sanjiaohanshu';

  constructor(private router: Router, global: GlobalsService) { }

  ngOnInit() {

  }
  
  check_record(){

  }

  start_problem(topic){
    this.router.navigate(['/problem-set', topic]).then(nav => {
      console.log(nav); 
    }, err => {
      console.log(err) 
    });
  }

}
