import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-long-question-report-solution-steps',
  templateUrl: './long-question-report-solution-steps.component.html',
  styleUrls: ['./long-question-report-solution-steps.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class LongQuestionReportSolutionStepsComponent {

  @Input() cur_problem: Problem;
  @Input() sub_prob: number;

  checked = [true,true,true,true,true];
  disabled = ['disabled','disabled','disabled','disabled','disabled'];


  constructor() { }

  ngOnInit() {
    console.log(this.cur_problem);
  }

}

