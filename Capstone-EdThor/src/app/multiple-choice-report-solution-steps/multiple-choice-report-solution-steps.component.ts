import { Component, Input} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-multiple-choice-report-solution-steps',
  templateUrl: './multiple-choice-report-solution-steps.component.html',
  styleUrls: ['./multiple-choice-report-solution-steps.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class MultipleChoiceReportSolutionStepsComponent {

  @Input() cur_problem: Problem;

  constructor() { }


}

