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
  selector: 'app-long-question-report-answer',
  templateUrl: './long-question-report-answer.component.html',
  styleUrls: ['./long-question-report-answer.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class LongQuestionReportAnswerComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Input() sub_prob: number;


  constructor() { }

  ngOnInit(){

  }

}

