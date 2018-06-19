import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"],
  animations: [
    trigger('state', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.1)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({ opacity: 0 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('inactive => void', [
        animate('600ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SummaryComponent implements OnInit {

  @Input() record_list: any[];
  @Input() kc_set: any[];


  correct_num: number = 0;
  incorrect_num: number = 0;

  fill_in_blank_progress: number = 0;
  multiple_choice_progress: number = 0;
  long_question_progress: number = 0;

  timer_1: any;
  timer_2: any;
  timer_3: any;

  setFillinBlankProgress(num) {
    console.log("fillinblank:" + num);
    this.fill_in_blank_progress++;
    const that = this;
    this.timer_1 = setTimeout(function () {
      if (that.fill_in_blank_progress > num) {
        clearTimeout(that.timer_1);
      }
      else {
        that.setFillinBlankProgress(num);
      }
    }, '10');
  }

  setMultipleChoiceProgress(num) {
    console.log("multiplechoice:" + num);
    this.multiple_choice_progress++;
    const that = this;
    this.timer_2 = setTimeout(function () {
      if (that.multiple_choice_progress > num) {
        clearTimeout(that.timer_2);
      }
      else {
        that.setMultipleChoiceProgress(num);
      }
    }, '10');
  }

  setLongQuestionProgress(num) {
    console.log("longquestion:" + num);
    this.long_question_progress++;
    const that = this;
    this.timer_3 = setTimeout(function () {
      if (that.long_question_progress > num) {
        clearTimeout(that.timer_3);
      }
      else {
        that.setLongQuestionProgress(num);
      }
    }, '10');
  }

  raw_duration_multiple_choice: number = 0;
  raw_duration_fill_in_blank: number = 0;
  raw_duration_long_question: number = 0;

  avg_duration_multiple_choice: number = 0;
  avg_duration_fill_in_blank: number = 0;
  avg_duration_long_question: number = 0;
  total_duration: number = 0;

  num_multiple_choice: number = 0;
  num_fill_in_blank: number = 0;
  num_long_question: number = 0;

  answer_set: boolean[] = [];

  constructor() {
  }

  ngOnInit() {
    // this.setFillinblankProgress();
    const that = this;
    setTimeout(function () {
      for (var i = 0; i < that.record_list.length; i++) {
        if (that.record_list[i].problem_type == 2 || that.record_list[i].problem_type == 3) {
          if (that.record_list[i].problem_answer[0] == true) {
            that.correct_num++;
            that.answer_set.push(true);
          }
          else {
            that.incorrect_num++;
            that.answer_set.push(false);
          }
        }
        else if (that.record_list[i].problem_type == 1) {
          var temp = 0;
          for (var j = 0; j < that.record_list[i].problem_answer.length; j++) {
            if (that.record_list[i].problem_answer[j] == false) {
              that.incorrect_num++;
              that.answer_set.push(false);
              temp = 1;
              break;
            }
          }
          if (temp == 0) {
            that.correct_num++;
            that.answer_set.push(true);
          }
        }
      }
    }, '200');

    setTimeout(function () {
      for (var i = 0; i < that.record_list.length; i++) {
        if (that.record_list[i].problem_type == 1) {
          that.raw_duration_long_question += that.record_list[i].problem_duration;
          that.num_long_question++;
        }
        else if (that.record_list[i].problem_type == 2) {
          that.raw_duration_fill_in_blank += that.record_list[i].problem_duration;
          that.num_fill_in_blank++;
        }
        else if (that.record_list[i].problem_type == 3) {
          that.raw_duration_multiple_choice += that.record_list[i].problem_duration;
          that.num_multiple_choice++;
        }
      }
      that.total_duration = Math.round((this.raw_duration_long_question + this.raw_duration_fill_in_blank + this.raw_duration_multiple_choice) / 1000 / 60);

      if (that.num_long_question == 0) {
        that.raw_duration_long_question = 0;
        that.avg_duration_long_question = 0;
      }
      else {
        that.avg_duration_long_question = that.raw_duration_long_question / 1000 / 60 / that.num_long_question;
      }

      if (that.num_fill_in_blank == 0) {
        that.raw_duration_fill_in_blank = 0;
        that.avg_duration_fill_in_blank = 0;
      }
      else {
        that.avg_duration_fill_in_blank = that.raw_duration_fill_in_blank / 1000 / 60 / that.num_fill_in_blank;
      }

      if (that.num_multiple_choice == 0) {
        that.raw_duration_multiple_choice = 0;
        that.avg_duration_multiple_choice = 0;
      }
      else {
        that.avg_duration_multiple_choice = that.raw_duration_multiple_choice / 1000 / 60 / that.num_multiple_choice;
      }

      that.orderDuration();

    }, '200');


  }

  orderDuration() {
    console.log("orderDuataion...");
    let a = this.avg_duration_fill_in_blank;
    let b = this.avg_duration_multiple_choice;
    let c = this.avg_duration_long_question;
    if (a > b && a > c) {
      this.setFillinBlankProgress(150);
      this.setMultipleChoiceProgress(150*b/a);
      this.setLongQuestionProgress(150*c/a);
    }
    else if( b > c && b > a){
      this.setFillinBlankProgress(150*a/b);
      this.setMultipleChoiceProgress(150);
      this.setLongQuestionProgress(150*c/b);
    }
    else if( c > a && c > b){
      this.setFillinBlankProgress(150*a/c);
      this.setMultipleChoiceProgress(150*b/c);
      this.setLongQuestionProgress(150); 
    }
    // if (c < a && c < b && b < a) {
    // this.setFillinBlankProgress(150);
    // this.setMultipleChoiceProgress(70);
    // this.setLongQuestionProgress(60);
    // } else if (c < a && b < c && b < a) {
    //   this.setFillinBlankProgress(150);
    //   this.setMultipleChoiceProgress(150*b/a);
    //   this.setLongQuestionProgress(150*c/a);
    // } else if (c < a && c < b && a < b) {
    //   this.setFillinBlankProgress(150*a/b);
    //   this.setMultipleChoiceProgress(150);
    //   this.setLongQuestionProgress(150*c/b);
    // } else if (a < c && a < b && c < b) {
    //   this.setFillinBlankProgress(150*a/b);
    //   this.setMultipleChoiceProgress(150);
    //   this.setLongQuestionProgress(150*c/b);
    // } else if (a < b && a < c && b < c) {
    //   this.setFillinBlankProgress(150*a/c);
    //   this.setMultipleChoiceProgress(150*b/c);
    //   this.setLongQuestionProgress(150);
    // } else if (b < a && b < c && a < c) {
    //   this.setFillinBlankProgress(150*a/c);
    //   this.setMultipleChoiceProgress(150*b/c);
    //   this.setLongQuestionProgress(150);
    // }
  }
}
