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
  selector: 'app-long-question-check',
  templateUrl: './long-question-check.component.html',
  styleUrls: ['./long-question-check.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class LongQuestionCheckComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;
}
