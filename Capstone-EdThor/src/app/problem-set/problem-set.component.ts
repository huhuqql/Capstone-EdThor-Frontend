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
  private check_answer_button: any;
  private next_step_button: any;
  private check_solution_button: any;


  constructor(private sanitized: DomSanitizer, private route: ActivatedRoute, private global: GlobalsService, private http: HttpClient, private userService: UserService) {
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
    //this.selected_type = 1;
    this.selected_type = this.getRandomInt(1,3);
    console.log("selected type =" + this.selected_type);
  }

  submitMCOptions(option) {
    console.log("final choice:" + option);
    var type_name = "multiple-choice";
    this.cur_problem.problem_multiple_choice_answer = option - 1;

    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
      .subscribe(data => {
        var temp_answer = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip");
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

        if (temp_answer.indexOf(temp) < 0) {
          console.log("you are wrong");
          this.answer_list.push(false);
        }
        else {
          console.log("you are right");
          this.answer_list.push(true);
        }
        this.cur_problem.problem_answers[0] = this.transform(temp_answer);
      });
  }

  getLongquestionAnswer() {
    var type_name = "long-question";
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer_" + this.cur_sub_prob + ".html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_answers[this.cur_sub_prob] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer_" + this.cur_sub_prob + "/clip");
      });
  }


  getFillinblankAnswer() {
    var type_name = "fill-in-blank";
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_answers[0] = this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip"));
      });
  }


  // showAnswer() {

  //   var temp;
  //   if (this.cur_problem.problem_multiple_choice_answer == 0) {
  //     temp = ">A<";
  //   }
  //   else if (this.cur_problem.problem_multiple_choice_answer == 1) {
  //     temp = ">B<";
  //   }
  //   else if (this.cur_problem.problem_multiple_choice_answer == 2) {
  //     temp = ">C<";
  //   }
  //   else if (this.cur_problem.problem_multiple_choice_answer == 3) {
  //     temp = ">D<";
  //   }

  //   if (this.cur_problem.problem_answers[0].indexOf(temp) < 0) {
  //     console.log("you are wrong");
  //     this.answer_list.push(false);
  //   }
  //   else {
  //     console.log("you are right");
  //     this.answer_list.push(true);
  //   }

  //   //free memory

  // }


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

  requestSolutionSteps(type_name, num) {
    this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "/solution_" + this.cur_sub_prob + "/" + num + ".html", { responseType: 'text' })
      .subscribe(data => {
        this.cur_problem.problem_long_question_solution[this.cur_sub_prob].push(this.transform(this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/solution_" + this.cur_sub_prob + "/" + num + "/clip")));
        this.requestSolutionSteps(type_name, num + 1);
      }, error => {
        console.log(error);
      });
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

  // showSolutionSteps() {
  //   this.problem_solution_steps_element = document.getElementById("problem-solution-steps");
  //   this.problem_solution_steps_element.innerHTML = this.cur_problem.problem_solution_steps;
  // }


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

  showNewProblem() {
    this.cur_problem_number++;
    this.cur_problem.state = "void";

    var d = new Date();
    this.start_time = d.getTime();
    this.initProblem();
    this.getProblem();
    this.getQuestion();
    this.cur_step = 0;
    this.cur_sub_prob = 1;


    const that = this;
    setTimeout(function () {
      that.getButtons();
      that.initButtons();     
    }, '50');


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

  jumpStep() {
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 1) {
        this.cur_problem.problem_long_question_solution[this.cur_sub_prob] = [];
        this.cur_step++;
        this.cur_step++;
        this.cur_sub_prob++;
        this.getLongquestionAnswer();
      }
      else {
        this.nextProblem();
      }
    }
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
