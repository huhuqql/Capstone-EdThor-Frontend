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
  selector: 'app-multiple-choice-options',
  templateUrl: './multiple-choice-options.component.html',
  styleUrls: ['./multiple-choice-options.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class MultipleChoiceOptionsComponent {

  choice: number;

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Output() saveSubmitOptions = new EventEmitter<number>();

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
