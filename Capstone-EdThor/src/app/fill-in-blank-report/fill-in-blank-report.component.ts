import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-fill-in-blank-report',
  templateUrl: './fill-in-blank-report.component.html',
  styleUrls: ['./fill-in-blank-report.component.css', '../summary/summary.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
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
export class FillInBlankReportComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Output() returnToReport = new EventEmitter();

  page: number = 0;
  button_text = "查看解析";

  constructor() { }

  ngOnInit() {
    console.log(this.cur_problem);
    const that = this;
    setTimeout(function () {
      that.cur_problem.state = "active";
    }, '300');
  }

  switchPage() {
    const that = this;
    if (this.page == 0) {
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.page = 1;
        that.button_text = "返回记录";
      }, '300');
      setTimeout(function () {
        that.cur_problem.state = "active";
      }, '300');
    }
    else {
      that.cur_problem.state = "inactive";
      setTimeout(function () {
        that.page = 0;
        that.button_text = "查看解析";
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

