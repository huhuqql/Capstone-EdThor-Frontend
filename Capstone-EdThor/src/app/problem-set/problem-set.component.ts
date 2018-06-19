import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';

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
    problem_answer_instruction: [],
    problem_answers: [],
    problem_solution_steps: "",
    problem_long_question_solution: [[], [], []],
    problem_multiple_choice_answer: -1,
    state: "inactive"
  };

  topic: any;
  topic_name: any;
  problem_set: any[] = ["1", "2", "3"];
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

  selected_num: number;
  selected_type: number;

  progress: number = 0;

  start_time: number;
  end_time: number;

  record_list: Record[] = [];
  answer_list: boolean[] = [];


  private math_formlua_element: any;
  private math_formlua_img_element: any[] = [];
  // private symbol_input_element: any;

  //for all
  private problem_text_element: any;
  private problem_questions_element: any[] = [];
  private check_answer_options_element: any;
  private check_answer_button: any;
  private next_step_button: any;
  private check_solution_button: any;

  // private check_option_button_correct_element: any;
  // private check_option_button_incorrect_element: any;

  //multiple-choice & fill-in-blank
  private problem_solution_steps_element: any;

  //multiple choice
  private multiple_choice_options_element: any[] = [];
  private multiple_choice_answer_element: any;
  private multiple_choice_input_element: any;
  private multiple_choice_result_element: any;

  //long-question element
  private long_question_solution_check_element: any[] = [];
  private long_question_answer_element: any;

  //fill-in-blank
  private fill_in_blank_answer_element: any;

  constructor(private route: ActivatedRoute, private global: GlobalsService, private http: HttpClient, private userService: UserService) {
    this.sub = route.params.subscribe(params => {
      this.topic = params['topic'];
    });
  }

  fortest() {
    this.selected_type = 4;
  }

  ngOnDestroy() {
    this.math_formlua_element = null;
    this.math_formlua_img_element = null;
    this.problem_text_element = null;
    // this.symbol_input_element = null;
    this.problem_questions_element = null;
    this.multiple_choice_options_element = null;
    this.multiple_choice_answer_element = null;
    this.multiple_choice_input_element = null;
    this.multiple_choice_result_element = null;
    this.long_question_solution_check_element = null;
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
    this.selected_type = this.getRandomInt(1,3);
    console.log(this.selected_type);
  }

  submitMCOptions(option) {
    console.log("final choice:" + option);
    var type_name = "multiple-choice";
    this.cur_problem.problem_multiple_choice_answer = option - 1;

    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_answers[0] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip");
        this.showAnswer();
      });
  }

  getLongquestionAnswer() {
    var type_name = "long-question";
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer_" + this.cur_sub_prob + ".html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_answers[this.cur_sub_prob] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer_" + this.cur_sub_prob + "/clip");
        this.showLongquestionAnswer();
      });
  }

  showLongquestionAnswer() {
    this.long_question_answer_element = document.getElementById("problem-long-question-answer");
    this.long_question_answer_element.innerHTML = this.cur_problem.problem_answers[this.cur_sub_prob];
  }

  getFillinblankAnswer() {
    var type_name = "fill-in-blank";
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_answers[0] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip");
        this.showFillinblankAnswer();
      });
  }

  showFillinblankAnswer() {
    this.fill_in_blank_answer_element = document.getElementById("problem-fill-in-blank-answer");
    this.fill_in_blank_answer_element.innerHTML = this.cur_problem.problem_answers[0];
  }

  showAnswer() {
    this.multiple_choice_answer_element = document.getElementById("problem-answer");
    this.multiple_choice_answer_element.innerHTML = this.cur_problem.problem_answers[0];

    var temp;
    if (this.cur_problem.problem_multiple_choice_answer == 0) {
      temp = ">A<";
    }
    else if (this.cur_problem.problem_multiple_choice_answer == 1) {
      temp = ">B<";
    }
    else if (this.cur_problem.problem_multiple_choice_answer == 2) {
      temp = ">C<";
    }
    else if (this.cur_problem.problem_multiple_choice_answer == 3) {
      temp = ">D<";
    }

    if (this.cur_problem.problem_answers[0].indexOf(temp) < 0) {
      console.log("you are wrong");
      this.answer_list.push(false);
    }
    else {
      console.log("you are right");
      this.answer_list.push(true);
    }

    //free memory
    this.multiple_choice_options_element = [];
    this.problem_questions_element = [];

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
        this.cur_problem.problem_text = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/problem/clip");
        this.showProblemText();
      });
  }

  getQuestion() {
    console.log("getQuestion!");
    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";

      for (var i = 0; i < 4; i++) {
        this.problem_questions_element.push(document.getElementById("problem-question-" + i));
      }

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/a.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[0] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/a/clip");
          this.showOptions(0);
        }, error => console.log('oops', error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/b.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[1] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/b/clip");
          this.showOptions(1);
        }, error => console.log('oops', error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/c.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[2] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/c/clip");
          this.showOptions(2);
        }, error => console.log('oops', error));

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/d.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_questions[3] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/d/clip");
          this.showOptions(3);
        }, error => console.log('oops', error));

    }
  }

  showOptions(num) {
    this.problem_questions_element[num].innerHTML = this.cur_problem.problem_questions[num];
  }

  requestSolutionSteps(type_name, num) {
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "/solution_" + this.cur_sub_prob + "/" + num + ".html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_long_question_solution[this.cur_sub_prob].push(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution_" + this.cur_sub_prob + "/" + num + "/clip"));
        this.showSolutionCheck(num - 1);
        this.requestSolutionSteps(type_name, num + 1);

      }, error => {
        console.log('oops', error);
        console.log(this.cur_problem.problem_long_question_solution);
      });
  }

  showSolutionCheck(num) {
    console.log(this.cur_problem.problem_long_question_solution);
    const that = this;
    setTimeout(function () {
      console.log(num);
      that.long_question_solution_check_element[num] = document.getElementById("long-question-solution-check-" + num);
      that.long_question_solution_check_element[num].innerHTML = that.cur_problem.problem_long_question_solution[that.cur_sub_prob][num];
    }, '200');
  }


  getSolutionSteps() {
    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
      this.requestSolutionSteps(type_name, 1);
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "solution-step.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_solution_steps = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution-step/clip");
          this.showSolutionSteps();
        });
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";
      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "solution-step.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_solution_steps = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution-step/clip");
          this.showSolutionSteps();
        });

    }

  }

  showSolutionSteps() {
    this.problem_solution_steps_element = document.getElementById("problem-solution-steps");
    this.problem_solution_steps_element.innerHTML = this.cur_problem.problem_solution_steps;
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

  showProblemText() {
    this.problem_text_element = document.getElementById("problem-text");
    this.problem_text_element.innerHTML = this.cur_problem.problem_text;
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
    console.log(this.answer_list);
  }

  showNewProblem() {
    this.cur_problem_number++;
    this.cur_problem.state = "void";

    var d = new Date();
    this.start_time = d.getTime();
    const that = this;
    setTimeout(function () {
      that.initProblem();
      that.getProblem();
      that.cur_step = 0;
      that.cur_sub_prob = 1;
      that.getButtons();
      that.initButtons();
    }, '200');
    setTimeout(function () {
      that.getQuestion();
    }, '400');
  }

  getRandomInt(min: number, max: number): number {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
  }

  initButtons(){
    this.check_answer_button.disabled = "";
    this.check_solution_button.disabled = "disabled";
    this.next_step_button.disabled = "disabled";
  }

  nextProblem() {
    console.log("the step is now: " + this.cur_step);
    var d = new Date();
    this.end_time = d.getTime();
    this.generateRecord();
    console.log(this.record_list);
    this.generateProblem();
    this.showNewProblem();
    var temp = this.progress;
    $('.progress-bar').css("width", function (i) {
      if (temp < 100) {
        return temp + 10 + "%";
      }
    });
    this.progress = this.progress + 10;
    console.log("this progress = " + this.progress);
  }


  generateRecord() {
    let new_record: Record = {
      student_id: this.userService.getStudentId(),
      problem_id: this.cur_problem.problem_id,
      problem_type: this.cur_problem.problem_type,
      problem_num: this.selected_num,
      problem_duration: this.end_time - this.start_time,
      problem_answer: [],
      problem_kc: [],
    }
    if (this.selected_type == 1) {
      for (var i = 0; i < this.answer_list.length; i++) {
        new_record.problem_answer[i] = this.answer_list[i];
      }
    }
    else if (this.selected_type == 2 || this.selected_type == 3) {
      new_record.problem_answer[0] = this.answer_list[0];
    }
    this.record_list.push(new_record);
    this.answer_list = [];
  }

  nextStep() {
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 0) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.cur_step++;
        this.getLongquestionAnswer();
      }
      else if (this.cur_step == 1) {
        this.cur_step++;
        this.getSolutionSteps();
      }
      else if (this.cur_step == 2) {
        this.cur_problem.problem_long_question_solution[this.cur_sub_prob] = [];
        this.cur_step++;
        this.cur_sub_prob++;
        this.getLongquestionAnswer();
      }
      else if (this.cur_step == 3) {
        this.cur_step++;
        this.next_step_button.disabled = "";
        this.check_solution_button.disabled = "disabled";
        this.getSolutionSteps();
      }
      console.log("the step is now: " + this.cur_step);
    }
    else if (this.cur_problem.problem_type == 2) {

      if (this.cur_step == 0) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getFillinblankAnswer();
      }
      else if (this.cur_step == 1) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getSolutionSteps();
      }
      console.log("the step is now: " + this.cur_step);
    }
    else if (this.cur_problem.problem_type == 3) {
      if (this.cur_step == 0) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        this.cur_step++;
      }
      else if (this.cur_step == 1) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getSolutionSteps();
      }
      console.log("the step is now: " + this.cur_step);
    }
  }
}
