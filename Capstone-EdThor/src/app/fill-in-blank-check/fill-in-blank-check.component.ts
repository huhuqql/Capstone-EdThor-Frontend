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
  selector: 'app-fill-in-blank-check',
  templateUrl: './fill-in-blank-check.component.html',
  styleUrls: ['./fill-in-blank-check.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class FillInBlankCheckComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
}
