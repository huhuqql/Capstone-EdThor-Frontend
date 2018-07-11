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
  selector: 'app-long-question-step-check',
  templateUrl: './long-question-step-check.component.html',
  styleUrls: ['./long-question-step-check.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class LongQuestionStepCheckComponent implements OnInit {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;
  @Input() cur_sub_prob: number;

  @Output() saveStepCheckOptions = new EventEmitter<any>();
  @Output() saveStepCheckOptionsAlternate = new EventEmitter<any>();
  checked: boolean[] = [];
  cur_kcs: string[] = [];
  kc_names = ['任意角的弧度制和任意角的三角函数', '同角三角函数的基本关系式和诱导公式', '三角函数的图像与性质', '三角函数图像变换', '正弦定理', '余弦定理', '斜三角形面积公式'];
  checked_alternate: boolean = false;

  ngOnInit() {
    for (var i = 0; i < this.cur_problem.problem_long_question_solution[this.cur_sub_prob].length; i++) {
      this.checked[i] = false;
    }

    if (this.cur_sub_prob == 1) {
      for (var i = 0; i < this.cur_problem.problem_long_question_solution[this.cur_sub_prob].length; i++) {
        if(this.cur_problem.problem_kc[i] < 0){
          this.cur_kcs.push("无");
        }
        else{
          this.cur_kcs.push(this.kc_names[this.cur_problem.problem_kc[i] - 1]);
        }
      }
    }
    else {
      var templength = this.cur_problem.problem_kc.length - this.cur_problem.problem_long_question_solution[this.cur_sub_prob].length;
      for (var i = 0; i < this.cur_problem.problem_long_question_solution[this.cur_sub_prob].length; i++) {
        if(this.cur_problem.problem_kc[templength + i] < 0){
          this.cur_kcs.push("无");
        }
        else{
          this.cur_kcs.push(this.kc_names[this.cur_problem.problem_kc[templength + i] - 1]);
        }
      }
    }

    console.log(this.cur_kcs);
  }


  readySubmitOptions() {
    const that = this;
    setTimeout(function () {
      that.saveStepCheckOptions.emit(that.checked);
      that.saveStepCheckOptionsAlternate.emit(that.checked_alternate);
    }, '100');
  }

}
