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
  selector: 'app-fill-in-blank-solution-steps',
  templateUrl: './fill-in-blank-solution-steps.component.html',
  styleUrls: ['./fill-in-blank-solution-steps.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class FillInBlankSolutionStepsComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
}
