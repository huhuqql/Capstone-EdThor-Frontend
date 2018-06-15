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
  selector: 'app-long-question-input',
  templateUrl: './long-question-input.component.html',
  styleUrls: ['./long-question-input.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class LongQuestionInputComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;
}
