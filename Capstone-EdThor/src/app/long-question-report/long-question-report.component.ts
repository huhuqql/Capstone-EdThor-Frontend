import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-long-question-report',
  templateUrl: './long-question-report.component.html',
  styleUrls: ['./long-question-report.component.css','../summary/summary.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
  animations: [
    trigger('state', [
      state('active', style({ transform: 'translateX(0) scale(1)' })),
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LongQuestionReportComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Output() returnToReport = new EventEmitter();

  page: number = 0;
  button_1_text = "查看解析";
  button_2_text = "下一小题";
  sub_prob = 1;

  constructor() { }

  ngOnInit() {
    console.log(this.cur_problem);
    const that = this;
    setTimeout(function () {
      that.cur_problem.state = "active";
    }, '300');
  }

  switchPage_1(){
    const that = this;
    if(this.page == 0){
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.page = 1;
        that.button_1_text = "返回记录";
      }, '300');
      setTimeout(function () {
        that.cur_problem.state = "active";
      }, '300');
    }
    else{
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.page = 0;
        that.button_1_text = "查看解析";
      }, '300');
      setTimeout(function () {
        that.cur_problem.state = "active";
      }, '300');
    }
  }

  switchPage_2(){
    const that = this;
    if(this.sub_prob == 1){
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.sub_prob = 2;
        that.button_2_text = "上一小题";
      }, '300');
      setTimeout(function () {
        that.cur_problem.state = "active";
      }, '300');
    }
    else{
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.sub_prob = 1;
        that.button_2_text = "下一小题";
      }, '300');
      setTimeout(function () {
        that.cur_problem.state = "active";
      }, '300');
    }
  }

  goReturnToReport(){
    this.returnToReport.emit();
  }

}

