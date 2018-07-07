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
  selector: 'app-long-question',
  templateUrl: './long-question.component.html',
  styleUrls: ['./long-question.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
  animations: [
    trigger('state', [
      state('active', style({ transform: 'translateX(0) scale(1)' })),
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('100ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LongQuestionComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;
  @Input() cur_problem_number: number;
  @Output() nextStep = new EventEmitter();
  @Output() nextProblem = new EventEmitter();
  @Output() submitOptions = new EventEmitter<string>();
  @Output() submitLQOptions = new EventEmitter<boolean[]>();
  @Output() submitLQAlternateOption = new EventEmitter<boolean>();
  @Output() jumpStep = new EventEmitter();

  my_option: string;
  step_check_options: boolean[];
  step_check_option_alternate: boolean;

  enterNextStep() {
    console.log("next");
    if ((this.my_option != null) && (this.cur_step == 1 || this.cur_step == 3)) {
      this.submitOptions.emit(this.my_option);
      if(this.my_option == "yes"){
        this.jumpStep.emit();
      }
      else{
        this.nextStep.emit();
      }
    }
    else if (this.cur_step == 0) {
      this.nextStep.emit();
    }
    else if(this.cur_step == 2){
      this.submitLQOptions.emit(this.step_check_options);
      this.submitLQAlternateOption.emit(this.step_check_option_alternate);
      this.nextStep.emit();
    }
    this.my_option = null;
    this.step_check_options = [];
  }

  enterNextProblem() {
    if ((this.my_option != null) && (this.cur_step == 1 || this.cur_step == 3)) {
      this.submitOptions.emit(this.my_option);
      this.nextProblem.emit();
    }
    else if (this.cur_step == 0 || this.cur_step == 2) {
      this.nextProblem.emit();
    }
    else if(this.cur_step == 4){
      this.submitLQOptions.emit(this.step_check_options);
      this.submitLQAlternateOption.emit(this.step_check_option_alternate);
      this.nextProblem.emit();
    }
    this.my_option = null;
    this.step_check_options = [];
  }

  saveSubmitOptions(option) {
    this.my_option = option;
  }

  saveStepCheckOptions(options){
    this.step_check_options = options;
  }

  saveStepCheckOptionsAlternate(option){
    this.step_check_option_alternate = option;
  }

}