import { Component, Input, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-fill-in-blank-report-answer',
  templateUrl: './fill-in-blank-report-answer.component.html',
  styleUrls: ['./fill-in-blank-report-answer.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class FillInBlankReportAnswerComponent implements OnInit {

  @Input() cur_problem: Problem;


  constructor() { }


  ngOnInit() {

  }

}

