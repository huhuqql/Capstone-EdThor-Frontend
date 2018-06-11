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
  selector: 'app-multiple-choice-solution-steps',
  templateUrl: './multiple-choice-solution-steps.component.html',
  styleUrls: ['./multiple-choice-solution-steps.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class MultipleChoiceSolutionStepsComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
}
