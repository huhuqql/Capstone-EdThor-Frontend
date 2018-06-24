import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';
import { DomSanitizer } from '@angular/platform-browser';

import { Problem } from '../service/model/problem';
import { Record } from '../service/model/record';
import { User } from '../service/model/user';
import { RecordService } from "../service/record.service";

import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';

export declare var jquery: any;
export declare var $: any;
export declare var MathQuill;
// export declare var katex;

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent implements OnInit, OnDestroy {

  private base_url = "../../assets/files/";
  private sub: any;

  cur_problem: Problem = {
    problem_id: 0,
    problem_topic_name: "",
    problem_type: 0,
    problem_type_name: "",
    problem_text: "",
    problem_questions: [],
    problem_answers: [],
    problem_solution_steps: "",
    problem_long_question_solution: [[], [], []],
    problem_multiple_choice_answer: -1,
    state: "inactive"
  };

  topic: any;
  topic_name: any;
  problem_set: any[] = [];
  kc_set: any[] = [["正弦定理的理解与应用", 4], ["余弦定理的理解与应用", 3], ["三角函数的图像与性质", 2], ["同角三角形的基本关系和诱导公式", 1]];
  answer_set: any[] = [true, false, true];
  type_set: any[] = [];
  duration_set: any[] = [];
  cur_problem_number: number = 0;
  currentMathFormula: number = 0;
  math_formula: any[] = [];
  MQ: any;
  answerMathField: any[] = [];
  cur_answerMathField: number;
  cur_step: number = 0;
  cur_sub_prob: number = 0;

  selected_num: number = 0;
  selected_type: number = 0;

  progress: number = 0;

  start_time: number;
  end_time: number;

  record_list: Record[] = [];
  answer_list: boolean[] = [];
  LQ_answer_list_1: boolean[] = [];
  LQ_answer_list_2: boolean[] = [];


  private math_formlua_element: any;
  private math_formlua_img_element: any[] = [];
  // private symbol_input_element: any;

  //for all
  private check_answer_button: any;
  private next_step_button: any;
  private check_solution_button: any;


  constructor(private recordService: RecordService, private sanitized: DomSanitizer, private route: ActivatedRoute, private global: GlobalsService, private http: HttpClient, private userService: UserService) {
    this.sub = route.params.subscribe(params => {
      this.topic = params['topic'];
    });
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  fortest() {
    this.selected_type = 4;
  }

  ngOnDestroy() {
    this.math_formlua_element = null;
    this.math_formlua_img_element = null;
    // this.symbol_input_element = null;
    this.check_answer_button = null;
    this.next_step_button = null;
    this.check_solution_button = null;
  }

  ngOnInit() {
    this.topic_name = problems[0].problem_topic_name;
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formula.push("../../assets/img/mathformula/" + i + ".jpg");
    }
    this.generateProblem();
  }


  ngAfterViewInit() {
    this.getMathFormula();
    this.getButtons();
    this.showNewProblem();
  }

  generateProblem() {
    this.selected_num = 1;
    this.selected_type++;
    // this.selected_type = this.getRandomInt(1, 3);
  }

  submitMCOptions(option) {
    console.log("final choice:" + option);
    var type_name = "multiple-choice";

    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
      .subscribe(data => {
        if (data.indexOf(">A<") > 0) {
          this.cur_problem.problem_answers[0] = 0;
        }
        else if (data.indexOf(">B<") > 0) {
          this.cur_problem.problem_answers[0] = 1;
        }
        else if (data.indexOf(">C<") > 0) {
          this.cur_problem.problem_answers[0] = 2;
        }
        else if (data.indexOf(">D<") > 0) {
          this.cur_problem.problem_answers[0] = 3;
        }

        this.cur_problem.problem_multiple_choice_answer = option;

        if (this.cur_problem.problem_answers[0] != option) {
          this.answer_list.push(false);
        }
        else {
          this.answer_list.push(true);
        }
      });
  }

  getLongquestionAnswer() {
    if (this.cur_problem.problem_type == 1) {
      var type_name = "long-question";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer_1.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_answers[1] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer_1/clip");
        });

        this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer_2.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_answers[2] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer_2/clip");
        });
    }
  }


  getFillinblankAnswer() {
    if (this.cur_problem.problem_type == 2) {
      var type_name = "fill-in-blank";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_answers[0] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip"));
        });
    }
  }



  // checkRightorWrong(){
  //   console.log("看看你有没有做对...");
  //   this.check_option_button_correct_element = document.getElementById("check-option-button-correct");
  //   console.log(this.check_option_button_correct_element);
  //   this.check_option_button_incorrect_element = document.getElementById("check-option-button-incorrect");
  //   if(this.check_option_button_correct_element.checked == true){
  //     console.log("我做对了");
  //     return true;
  //   }
  //   else if(this.check_option_button_incorrect_element.checked == true){
  //     console.log("我做错了");
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  getProblem() {
    this.cur_problem.problem_id = this.selected_num;
    this.cur_problem.problem_type = this.selected_type;
    this.cur_problem.problem_num = this.selected_num;

    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
      this.cur_sub_prob = 1;
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";
    }

    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "problem.html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_text = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/problem/clip"));
      });
  }

  getQuestion() {
    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/a.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[0] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/a/clip"));
        }, error => console.log(error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/b.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[1] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/b/clip"));
        }, error => console.log(error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/c.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[2] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/c/clip"));
        }, error => console.log(error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/d.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[3] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/d/clip"));
        }, error => console.log(error));

    }
  }

  requestSolutionSteps(type_name, num, sub_problem) {
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "/solution_" + sub_problem + "/" + num + ".html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_long_question_solution[sub_problem].push(this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution_" + sub_problem + "/" + num + "/clip")));
        this.requestSolutionSteps(type_name, num + 1, sub_problem);
      }, error => {
        console.log(error);
      });
  }

  getSolutionSteps() {
    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
      this.requestSolutionSteps(type_name, 1, 1);
      this.requestSolutionSteps(type_name, 1, 2);
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "solution-step.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_solution_steps = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution-step/clip"));
        });
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "solution-step.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_solution_steps = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution-step/clip"));
        });
    }

  }

  changeImageUrl(content, target) {
    var pattern = /img src="(\S*)clip/g;
    var temp = content.replace(pattern, target);
    var pattern1 = /&quot;/g;
    temp = temp.replace(pattern1, '"');
    return temp;
  }

  getButtons() {
    this.check_answer_button = document.getElementById("check-answer-button");
    this.next_step_button = document.getElementById("next-step-button");
    this.check_solution_button = document.getElementById("check-solution-button");
  }

  getMathFormula() {
    this.math_formlua_element = document.getElementById("math-formula");
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formlua_img_element.push(document.getElementById("math-formula-img-" + i));
    }
    this.math_formlua_img_element[0].style.display = "block";
  }

  initProblem() {
    this.check_answer_button.disabled = "";
    this.next_step_button.disabled = "disabled";
    this.check_solution_button.disabled = "disabled";
    let temp: Problem = {
      problem_id: 0,
      problem_topic_name: "",
      problem_type: 0,
      problem_type_name: "",
      problem_text: "",
      problem_questions: [],
      problem_answer_instruction: [],
      problem_answers: [],
      problem_solution_steps: "",
      problem_long_question_solution: [[], [], []],
      problem_multiple_choice_answer: -1,
      state: "inactive"
    }
    this.cur_problem = temp;
  }

  // showSymbolInput(index) {
  //   this.cur_answerMathField = index;
  //   if (this.symbol_input_element.style.display == "block") {
  //     this.symbol_input_element.style.display = "none";
  //   }
  //   else {
  //     this.symbol_input_element.style.display = "block";
  //   }
  // }

  // initSymbolInput() {
  //   this.MQ = MathQuill.getInterface(2);
  //   for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
  //     this.answerMathField.push(this.MQ.MathField(this.problem_questions_target_input_element[i], {
  //       handlers: {
  //         edit: function () {

  //         }
  //       }
  //     }));
  //   }
  // }

  addSymbol(toAdd) {
    console.log(this.answerMathField);
    this.answerMathField[this.cur_answerMathField].cmd(toAdd);
  }

  readProblems() {
    return null;
  }

  selectProblems() {
    return null;
  }


  showMathFormula() {
    if (this.math_formlua_element.style.display == "block") {
      this.math_formlua_element.style.display = "none";
    }
    else {
      this.math_formlua_element.style.display = "block";
    }

  }

  lastMathFormula() {
    this.math_formlua_img_element[this.currentMathFormula].style.display = "none";
    if (this.currentMathFormula > 0) {
      this.currentMathFormula--;
    }
    this.math_formlua_img_element[this.currentMathFormula].style.display = "block";
  }

  nextMathFormula() {
    this.math_formlua_img_element[this.currentMathFormula].style.display = "none";
    if (this.currentMathFormula < this.global.MATHFORMULA_NUM - 1) {
      this.currentMathFormula++;
    }
    this.math_formlua_img_element[this.currentMathFormula].style.display = "block";
  }

  submitOptions(option) {
    if (option == "yes") {
      this.answer_list.push(true);
    }
    else {
      this.answer_list.push(false);
    }
  }

  submitLQOptions(options){
    if(this.cur_sub_prob == 1){
      this.LQ_answer_list_1 = options;
      console.log(this.LQ_answer_list_1);
    }
    else if(this.cur_sub_prob == 2){
      this.LQ_answer_list_2 = options;
      console.log(this.LQ_answer_list_2);
    }
  }

  showNewProblem() {
    this.cur_problem.state = "inactive";
    this.cur_problem_number++;
    // console.log("你刚刚做的题是：");
    // console.log(this.cur_problem);

    var d = new Date();
    this.start_time = d.getTime();


    // console.log("把这题加入记录...");
    // console.log(this.problem_set);

    const that = this;
    setTimeout(function () {
      that.initProblem();
      that.cur_step = 0;
      that.cur_sub_prob = 1;
      that.getProblem();
      that.getQuestion();
      that.getButtons();
      that.initButtons();
      that.getSolutionSteps();
      that.getLongquestionAnswer();
      that.getFillinblankAnswer();
    }, '100');
    setTimeout(function () {
      that.cur_problem.state = "active";
    }, '200');


  }

  getRandomInt(min: number, max: number): number {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
  }

  initButtons() {
    this.check_answer_button.disabled = "";
    this.check_solution_button.disabled = "disabled";
    this.next_step_button.disabled = "disabled";
  }

  nextProblem() {
    if (this.cur_problem_number > 0) {
      this.problem_set.push(this.cur_problem);
    }
    console.log(this.progress);
    if (this.progress > 65) {
      var d = new Date();
      this.end_time = d.getTime();
      this.generateRecord();
      console.log("看报告啦");
      var temp = this.progress;
      $('.progress-bar').css("width", function (i) {
        if (temp < 100) {
          return temp + 34 + "%";
        }
      });
      this.progress = this.progress + 34;
      this.selected_type = 4;
    }
    else {
      this.cur_problem.state = "active";
      var d = new Date();
      this.end_time = d.getTime();
      this.generateRecord();
      this.generateProblem();
      this.showNewProblem();
      var temp = this.progress;
      $('.progress-bar').css("width", function (i) {
        if (temp < 100) {
          return temp + 34 + "%";
        }
      });
      this.progress = this.progress + 34;
    }

  }


  generateRecord() {
    let new_record: Record = {
      studentId: this.userService.getStudentId(),
      problemId: this.cur_problem.problem_id,
      problemType: this.cur_problem.problem_type,
      problemNum: this.selected_num,
      problemDuration: this.end_time - this.start_time,
      problemResult: [],
      problemKc: [],
      problemLongquestionAnswer: []
    }
    if (this.selected_type == 1) {
      for (var i = 0; i < this.answer_list.length; i++) {
        new_record.problemResult[i] = this.answer_list[i];
      }
    }
    else if (this.selected_type == 2 || this.selected_type == 3) {
      new_record.problemResult[0] = this.answer_list[0];
    }
    new_record.problemLongquestionAnswer[0] = this.LQ_answer_list_1;
    new_record.problemLongquestionAnswer[1] = this.LQ_answer_list_2;
    this.record_list.push(new_record);
    this.answer_list = [];
    this.LQ_answer_list_1 = [];
    this.LQ_answer_list_2 = [];
    console.log(this.record_list);
    this.recordService.saveRecords(new_record);
  }

  jumpStep() {
    const that = this;
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 1) {
        this.cur_problem.state = "inactive";
        setTimeout(function () {
          that.cur_step++;
          that.cur_step++;
          that.cur_sub_prob++;
          that.getLongquestionAnswer();
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else {
        this.nextProblem();
      }
    }
  }

  nextStep() {
    const that = this;
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 0) {
        this.cur_problem.state = "inactive";
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else if (this.cur_step == 1) {
        this.cur_problem.state = "inactive";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else if (this.cur_step == 2) {
        this.cur_problem.state = "inactive";
        // this.cur_sub_prob++;
        setTimeout(function () {
          that.cur_step++;
          that.cur_sub_prob++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else if (this.cur_step == 3) {
        this.cur_problem.state = "inactive";
        this.next_step_button.disabled = "";
        this.check_solution_button.disabled = "disabled";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
    }
    else if (this.cur_problem.problem_type == 2) {
      if (this.cur_step == 0) {
        this.cur_problem.state = "inactive";
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else if (this.cur_step == 1) {
        this.cur_problem.state = "inactive";
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        // this.getSolutionSteps();
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
    }
    else if (this.cur_problem.problem_type == 3) {
      if (this.cur_step == 0) {
        this.cur_problem.state = "inactive";
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');
      }
      else if (this.cur_step == 1) {
        this.cur_problem.state = "inactive";
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        setTimeout(function () {
          that.cur_step++;
        }, '100');
        setTimeout(function () {
          that.cur_problem.state = "active";
        }, '200');

      }
    }
  }
}
