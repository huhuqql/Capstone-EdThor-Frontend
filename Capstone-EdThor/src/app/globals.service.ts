import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public sanjiaohanshu = 1;
  public shuzu = 2;

  public MATHFORMULA_NUM = 1;
  public NUMBERPROBLEM = 82;

  public kc_names = ['任意角的弧度制和任意角的三角函数', '同角三角函数的基本关系式和诱导公式', '三角函数的图像与性质', '三角函数图像变换', '正弦定理', '余弦定理', '斜三角形面积公式'];

}
