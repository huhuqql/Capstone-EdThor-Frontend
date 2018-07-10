import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-multiple-choice-answer',
  templateUrl: './multiple-choice-answer.component.html',
  styleUrls: ['./multiple-choice-answer.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class MultipleChoiceAnswerComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;

  color = ['', '', '', ''];
  checked = [false, false, false, false];
  result: string = "";
  instruction_border = "#76b852";
  arrow_border = "40px solid #76b852";

  ngOnInit() {
    const that = this;
    setTimeout(function () {
      if (that.cur_problem.problem_answers[0] == that.cur_problem.problem_multiple_choice_answer) {
        that.checked[that.cur_problem.problem_multiple_choice_answer] = true;
        that.result = "你答对啦";
      }
      else {
        that.color[that.cur_problem.problem_multiple_choice_answer] = 'warn';
        that.checked[that.cur_problem.problem_multiple_choice_answer] = true;
        that.checked[that.cur_problem.problem_answers[0]] = true;
        that.result = "你答错了";
        that.instruction_border = "#f44336";
        that.arrow_border = "40px solid #f44336";
      }
    }, '500');

  }

}
