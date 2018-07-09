import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      state('active', style({ transform: 'translateX(0) scale(1)' })),
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition('active => inactive', [
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SummaryComponent implements OnInit {

  @Input() record_list: any[];
  @Input() kc_set: any[];
  @Input() problem_set: any[];
  @Input() mastery_set: number[][];
  @Output() restartTest =  new EventEmitter();


  correct_num: number = 0;
  incorrect_num: number = 0;

  fill_in_blank_progress: number = 0;
  multiple_choice_progress: number = 0;
  long_question_progress: number = 0;
  cur_problem: Problem;
  kc_status: any[] = [];

  timer_1: any;
  timer_2: any;
  timer_3: any;

  kc_names = ['任意角的弧度制和任意角的三角函数', '同角三角函数的基本关系式和诱导公式', '三角函数的图像与性质', '三角函数图像变换', '正弦定理', '余弦定理', '斜三角形面积公式'];

  endTest() {
    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
    console.log("to dashboard");
  }

  goRestartTest(){
    this.restartTest.emit();
  }

  returnToReport() {
    this.page = 1;
  }

  showReport(num) {
    console.log(this.problem_set[num]);
    this.cur_problem = this.problem_set[num];
    this.cur_problem.state = "inactive";
    this.type = this.cur_problem.problem_type;
    this.page = 2;
    console.log("type =" + this.type);
    console.log("page =" + this.page);
  }

  generateKCstatus() {
    let tempkcs: number[] = [];
    for (var i = 0; i < this.problem_set.length; i++) {
      for (var j = 0; j < this.problem_set[i].problem_kc.length; j++) {
        let tempkc = this.problem_set[i].problem_kc[j];
        console.log("check " + tempkc);
        if (tempkcs.indexOf(tempkc) < 0) {
          tempkcs.push(tempkc);
        }
      }
    }
    console.log("这次练习碰到的kc：");
    console.log(tempkcs);

    for (var i = 0; i < tempkcs.length; i++) {
      let tempmastery = this.mastery_set[tempkcs[i] - 1][this.mastery_set[tempkcs[i] - 1].length - 1];
      console.log("the kc current mastery -------> " + tempmastery);
      if (tempmastery > 0.95) {
        this.kc_status.push([this.kc_names[tempkcs[i] - 1], 4]);
      }
      else if (tempmastery > 0.85) {
        this.kc_status.push([this.kc_names[tempkcs[i] - 1], 3]);
      }
      else if (tempmastery > 0.65) {
        this.kc_status.push([this.kc_names[tempkcs[i] - 1], 2]);
      }
      else if (tempmastery > 0.45) {
        this.kc_status.push([this.kc_names[tempkcs[i] - 1], 1]);
      }
      else if (tempmastery < 0.45) {
        this.kc_status.push([this.kc_names[tempkcs[i] - 1], 0]);
      }
    }
  }



  setFillinBlankProgress(num) {
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

  state: string = "inactive";
  page: number = 0;
  type: number = -1;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.problem_set);
    // this.setFillinblankProgress();
    const that = this;
    setTimeout(function () {
      that.state = "active"
    }, '500');


    setTimeout(function () {
      that.state = "inactive"
    }, '3000');

    setTimeout(function () {
      that.page = 1;
    }, '3300');

    setTimeout(function () {
      that.state = "active";
    }, '3500');



    setTimeout(function () {
      that.generateKCstatus();
      for (var i = 0; i < that.record_list.length; i++) {
        if (that.record_list[i].problemType == 2 || that.record_list[i].problemType == 3) {
          if (that.record_list[i].problemResult[0] == true) {
            that.correct_num++;
            that.answer_set.push(true);
          }
          else {
            that.incorrect_num++;
            that.answer_set.push(false);
          }
        }
        else if (that.record_list[i].problemType == 1) {
          var temp = 0;
          for (var j = 0; j < that.record_list[i].problemResult.length; j++) {
            if (that.record_list[i].problemResult[j] == false) {
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
    }, '3300');

    setTimeout(function () {
      for (var i = 0; i < that.record_list.length; i++) {
        if (that.record_list[i].problemType == 1) {
          that.raw_duration_long_question += that.record_list[i].problemDuration;
          that.num_long_question++;
        }
        else if (that.record_list[i].problemType == 2) {
          that.raw_duration_fill_in_blank += that.record_list[i].problemDuration;
          that.num_fill_in_blank++;
        }
        else if (that.record_list[i].problemType == 3) {
          that.raw_duration_multiple_choice += that.record_list[i].problemDuration;
          that.num_multiple_choice++;
        }
      }
      that.total_duration = Math.round((that.raw_duration_long_question + that.raw_duration_fill_in_blank + that.raw_duration_multiple_choice) / 1000 / 60);

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
    }, '3300');


  }

  orderDuration() {
    console.log("orderDuataion...");
    let a = this.avg_duration_fill_in_blank;
    let b = this.avg_duration_multiple_choice;
    let c = this.avg_duration_long_question;
    if (a > b && a > c) {
      this.setFillinBlankProgress(150);
      this.setMultipleChoiceProgress(150 * b / a);
      this.setLongQuestionProgress(150 * c / a);
    }
    else if (b > c && b > a) {
      this.setFillinBlankProgress(150 * a / b);
      this.setMultipleChoiceProgress(150);
      this.setLongQuestionProgress(150 * c / b);
    }
    else if (c > a && c > b) {
      this.setFillinBlankProgress(150 * a / c);
      this.setMultipleChoiceProgress(150 * b / c);
      this.setLongQuestionProgress(150);
    }
  }
}
