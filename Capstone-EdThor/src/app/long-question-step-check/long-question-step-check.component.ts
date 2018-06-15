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
  selector: 'app-long-question-step-check',
  templateUrl: './long-question-step-check.component.html',
  styleUrls: ['./long-question-step-check.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class LongQuestionStepCheckComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;
}
