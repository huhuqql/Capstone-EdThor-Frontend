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
  selector: 'app-fill-in-blank-input',
  templateUrl: './fill-in-blank-input.component.html',
  styleUrls: ['./fill-in-blank-input.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class FillInBlankInputComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
}
