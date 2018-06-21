import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-multiple-choice-report-answer',
  templateUrl: './multiple-choice-report-answer.component.html',
  styleUrls: ['./multiple-choice-report-answer.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
  animations: [
    trigger('state', [
      state('active', style({ transform: 'translateX(0) scale(1)' })),
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('100ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MultipleChoiceReportAnswerComponent implements OnInit {

  @Input() cur_problem: Problem;


  constructor() { }

  color = ['', '', '', ''];
  checked = [false, false, false, false];

  ngOnInit() {
    const that = this;
    setTimeout(function () {
      if (that.cur_problem.problem_answers[0] == that.cur_problem.problem_multiple_choice_answer) {
        that.checked[that.cur_problem.problem_multiple_choice_answer] = true;
      }
      else {
        that.color[that.cur_problem.problem_multiple_choice_answer] = 'warn';
        that.checked[that.cur_problem.problem_multiple_choice_answer] = true;
        that.checked[that.cur_problem.problem_answers[0]] = true;
      }
    }, '100');

  }

}

