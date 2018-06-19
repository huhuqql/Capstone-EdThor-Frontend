import { Component, Input, Output, EventEmitter  } from '@angular/core';


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
  styleUrls: ['./long-question-check.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class LongQuestionCheckComponent {

  choice: string;

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;

  @Output() saveSubmitOptions = new EventEmitter<string>();

  readySubmitOptions(){
    const that = this;
    setTimeout(function () {
      console.log("ready to :" + that.choice);
      if(that.choice != null){
        that.saveSubmitOptions.emit(that.choice);
      }
    }, '100');
  }
}
