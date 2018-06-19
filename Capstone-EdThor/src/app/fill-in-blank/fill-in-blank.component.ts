import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';
@Component({
  selector: 'app-fill-in-blank',
  templateUrl: './fill-in-blank.component.html',
  styleUrls: ['./fill-in-blank.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
  animations: [
    trigger('state', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.1)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('inactive => void', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FillInBlankComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_problem_number: number;
  @Output() nextStep = new EventEmitter();
  @Output() nextProblem = new EventEmitter();
  @Output() submitOptions = new EventEmitter<string>();

  my_option: string;

  enterNextStep() {
    console.log("next");
    if (this.my_option != null && this.cur_step == 1) {
      this.submitOptions.emit(this.my_option);
      this.nextStep.emit();
    }
    else if (this.cur_step == 0) {
      this.nextStep.emit();
    }
    this.my_option = null;
  }

  enterNextProblem() {
    if (this.my_option != null && this.cur_step == 1) {
      this.submitOptions.emit(this.my_option);
      this.nextProblem.emit();
    }
    else if (this.cur_step == 0 || this.cur_step == 2) {
      this.nextProblem.emit();
    }
    this.my_option = null;
  }

  saveSubmitOptions(option) {
    this.my_option = option;
    console.log("now you select:" + this.my_option);
  }
}
