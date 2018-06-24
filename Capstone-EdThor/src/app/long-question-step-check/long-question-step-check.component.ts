import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';
@Component({
  selector: 'app-long-question-step-check',
  templateUrl: './long-question-step-check.component.html',
  styleUrls: ['./long-question-step-check.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class LongQuestionStepCheckComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;

  @Output() saveStepCheckOptions = new EventEmitter<boolean[]>();
  checked: boolean[] = [];

  ngOnInit() {
    for (var i = 0; i < this.cur_problem.problem_long_question_solution[this.cur_sub_prob].length; i++) {
      this.checked[i] = false;
    }
  }


  readySubmitOptions() {
    const that = this;
    setTimeout(function () {
      that.saveStepCheckOptions.emit(that.checked);
    }, '100');
  }

}
