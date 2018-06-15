import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';

import { Problem } from '../service/model/problem';
import { HttpClient } from '@angular/common/http';

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
    problem_questions_target: [],
    problem_instruction: "",
    problem_answer_instruction: [],
    problem_answers: [],
    problem_solution_steps: "",
    problem_long_question_solution: [[], [], []],
    problem_multiple_choice_answer: -1
  };

  topic: any;
  topic_name: any;
  problem_set: any[] = [];
  num_problem: number;
  currentMathFormula: number = 0;
  math_formula: any[] = [];
  MQ: any;
  answerMathField: any[] = [];
  cur_answerMathField: number;
  cur_step: number = 0;
  cur_sub_prob: number = 0;

  selected_num: number;
  selected_type: number;



  private math_formlua_element: any;
  private math_formlua_img_element: any[] = [];
  private symbol_input_element: any;
  private problem_text_element: any;
  private problem_instruction: any;
  private target_element: any;
  private problem_questions_element: any[] = [];
  private problem_questions_target_element: any[] = [];
  private problem_questions_target_input_element: any[] = [];
  private check_answer_options_element: any;
  private check_answer_button: any;
  private next_step_button: any;
  private check_solution_button: any;

  private problem_solution_steps_element: any;
  private multiple_choice_options_element: any[] = [];
  private multiple_choice_answer_element: any;
  private multiple_choice_input_element: any;
  private multiple_choice_result_element: any;

  private long_question_solution_check_element: any[] = [];

  constructor(private route: ActivatedRoute, private global: GlobalsService, private http: HttpClient) {
    this.sub = route.params.subscribe(params => {
      this.topic = params['topic'];
    });
  }

  ngOnDestroy() {
    this.math_formlua_element = null;
    this.math_formlua_img_element = null;
    this.problem_text_element = null;
    this.symbol_input_element = null;
    this.problem_questions_element = null;
    this.problem_questions_target_element = null;
  }

  ngOnInit() {
    this.topic_name = problems[0].problem_topic_name;
    this.problem_set.push(problems[0]);
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
    this.selected_type = 3;
  }

  getAnswers() {
    var type_name: string;
    if (this.selected_type == 1) {
      type_name = "long-question";
    }
    else if (this.selected_type == 2) {
      type_name = "fill-in-blank";
    }
    else if (this.selected_type == 3) {
      type_name = "multiple-choice";

      this.http.get(this.base_url + type_name + "/" + this.selected_num + "/" + "answer.html", { responseType: 'text' })
        .subscribe(data => {
          this.cur_problem.problem_answers[0] = this.changeImageUrl(data, "img src=&quot;" + this.base_url + type_name + "/" + this.selected_num + "/answer/clip");
          this.showAnswer();
        });
    }
  }

  checkAnswer() {
    for (var i = 0; i < this.multiple_choice_options_element.length; i++) {
      if (this.multiple_choice_options_element[i].checked == true) {
        this.cur_problem.problem_multiple_choice_answer = i;
        this.getAnswers();
        return true;
      }
    }
    return false;
  }

  showAnswer() {
    this.multiple_choice_answer_element = document.getElementById("problem-answer");
    this.multiple_choice_answer_element.innerHTML = this.cur_problem.problem_answers[0];
    this.multiple_choice_input_element = document.getElementById("problem-answer-input");
    this.multiple_choice_input_element.innerHTML = this.cur_problem.problem_questions[this.cur_problem.problem_multiple_choice_answer];
    this.multiple_choice_result_element = document.getElementById("multiple-choice-options-input");
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
      this.multiple_choice_result_element.disabled = true;
    }
    else {
      this.multiple_choice_result_element.checked = true;
    }

    //free memory
    this.multiple_choice_options_element = [];
    this.problem_questions_element = [];
    // this.multiple_choice_answer_element = null;
    // this.multiple_choice_input_element = null;
    // this.multiple_choice_result_element = null;

  }

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
        this.showProblem();
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
        this.multiple_choice_options_element.push(document.getElementById("multiple-choice-options-" + i));
      }

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
    }, '500');
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

  showOptions(num) {
    this.problem_questions_element[num].innerHTML = this.cur_problem.problem_questions[num];
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


  getElement() {
    this.target_element = document.getElementById("target");
    this.symbol_input_element = document.getElementById("symbol-input");
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      this.problem_questions_target_element.push(document.getElementById("problem-questions-target-" + i));
      this.problem_questions_target_input_element.push(document.getElementById("problem-questions-target-input-" + i));
    }
    this.check_answer_options_element = document.getElementById("check-answer-options");
    console.log(this.problem_questions_element);
  }

  initProblem() {
    this.check_answer_button.disabled = "";
    this.next_step_button.disabled = "disabled";
    this.check_solution_button.disabled = "disabled";
    this.cur_problem.problem_text = "";
    this.cur_problem.problem_questions = [];
    this.cur_problem.problem_questions_target = [];
    this.cur_problem.problem_instruction = "";
    this.cur_problem.problem_answer_instruction = [];
    this.cur_problem.problem_answers = [];
    this.cur_problem.problem_solution_steps = "";
    this.cur_problem.problem_multiple_choice_answer = -1;
  }

  showInstruction() {
    // console.log(this.cur_problem.problem_answer_instruction[this.cur_step]);
    // katex.render(this.cur_problem.problem_answer_instruction[this.cur_step], this.problem_instruction);
  }

  showProblem() {
    this.problem_text_element = document.getElementById("problem-text");
    this.problem_text_element.innerHTML = this.cur_problem.problem_text;
  }

  showProblemTarget() {
    // for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
    //   katex.render(this.cur_problem.problem_questions_target[i], this.problem_questions_target_element[i]);
    // }
  }

  showSymbolInput(index) {
    this.cur_answerMathField = index;
    if (this.symbol_input_element.style.display == "block") {
      this.symbol_input_element.style.display = "none";
    }
    else {
      this.symbol_input_element.style.display = "block";
    }
  }

  initSymbolInput() {
    this.MQ = MathQuill.getInterface(2);
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      this.answerMathField.push(this.MQ.MathField(this.problem_questions_target_input_element[i], {
        handlers: {
          edit: function () {

          }
        }
      }));
    }
  }

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

  showNewProblem() {
    this.generateProblem();
    this.initProblem();
    this.getProblem();
    this.cur_step = 0;
    this.cur_sub_prob = 1;
    const that = this;
    setTimeout(function () {
      that.getQuestion();
    }, '100');
  }

  nextProblem() {
    this.check_answer_button.disabled = "";
    this.check_solution_button.disabled = "disabled";
    this.next_step_button.disabled = "disabled";
    this.showNewProblem();
  }

  nextStep() {
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 0) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.cur_step++;
        this.getAnswers();
      }
      else if (this.cur_step == 1) {
        this.cur_step++;
        this.getSolutionSteps();
      }
      else if (this.cur_step == 2) {
        this.cur_step++;
        this.cur_sub_prob++;
      }
      else if (this.cur_step == 3) {
        this.cur_step++;
        this.next_step_button.disabled = "";
        this.getSolutionSteps();
      }
      else if (this.cur_step == 4) {
        this.check_answer_button.disabled = "";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "disabled";
        this.showNewProblem();
      }

    }
    else if (this.cur_problem.problem_type == 2) {

      if (this.cur_step == 0) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getAnswers();
      }
      else if (this.cur_step == 1) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getSolutionSteps();
      }
      else if (this.cur_step == 2) {
        this.check_answer_button.disabled = "";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "disabled";
        this.showNewProblem();
      }
    }
    else if (this.cur_problem.problem_type == 3) {
      if (this.cur_step == 0 && this.checkAnswer() == true) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "";
        this.next_step_button.disabled = "";
        this.cur_step++;
      }
      else if (this.cur_step == 0 && this.checkAnswer() == false) {

      }
      else if (this.cur_step == 1) {
        this.check_answer_button.disabled = "disabled";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "";
        this.cur_step++;
        this.getSolutionSteps();
      }
      else if (this.cur_step == 2) {
        console.log("from multiple-choice to new problem");
        this.check_answer_button.disabled = "";
        this.check_solution_button.disabled = "disabled";
        this.next_step_button.disabled = "disabled";
        this.showNewProblem();
      }
    }
  }
}
