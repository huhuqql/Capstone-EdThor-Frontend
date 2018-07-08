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
  selector: 'app-fill-in-blank-solution-steps',
  templateUrl: './fill-in-blank-solution-steps.component.html',
  styleUrls: ['./fill-in-blank-solution-steps.component.css','../problem-set/problem-set.component.css',"../../assets/css/bootstrap.min.css"]
})
export class FillInBlankSolutionStepsComponent {

  @Input() cur_problem: Problem;
  @Input() cur_step: number;

  kc_names = ['任意角的弧度制和任意角的三角函数', '同角三角函数的基本关系式和诱导公式', '三角函数的图像与性质', '三角函数图像变换', '正弦定理', '余弦定理', '斜三角形面积公式'];

}
