import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';

import * as problemjs from './problem-set.js';
import { Question } from '../service/model/question';

export declare var katex;

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent implements OnInit, OnDestroy {

  private sub: any;

  cur_problem: Question = {
    problem_id: 0,
    problem_topic_name: "",
    problem_type: 0,
    problem_type_name: "",
    problem_text: "",
    problem_questions: [],
    problem_questions_target: [],
    problem_instruction: "",
    problem_answers: []
  };

  topic: any;
  topic_name: any;
  problem_set: any;
  num_Question: number = 0;
  currentMathFormula: number = 0;
  math_formula: any[] = [];

  private math_formlua_element: any;
  private math_formlua_img_element: any[] = [];
  private symbol_input_element: any;
  private problem_text_element: any;
  private problem_questions_element: any[] = [];
  private problem_questions_target_element: any[] = [];

  constructor(private route: ActivatedRoute, private global: GlobalsService) {
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
    this.problem_set = problems;
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formula.push("../../assets/img/mathformula/" + i + ".jpg");
    }
    this.getQuestion();
  }

  ngAfterViewInit() { // or some event handler
    if (this.cur_problem.problem_type == 1) {
      this.getElement();
      this.showProblem();
    }
  }

  getQuestion() {
    //计算题
    this.cur_problem.problem_id = this.problem_set[this.num_Question].problem_id;
    this.cur_problem.problem_type = this.problem_set[this.num_Question].problem_type;
    this.cur_problem.problem_type_name = this.problem_set[this.num_Question].problem_type_name;
    this.cur_problem.problem_text = this.num_Question + 1 + "." + this.problem_set[this.num_Question].problem_text;
    if (this.cur_problem.problem_type == 1) {
      this.cur_problem.problem_instruction = this.problem_set[this.num_Question].problem_instruction;

      //get Questions
      if (this.problem_set[this.num_Question].problem_question_1 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_Question].problem_question_1);
      }
      if (this.problem_set[this.num_Question].problem_question_2 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_Question].problem_question_2);
      }
      if (this.problem_set[this.num_Question].problem_question_3 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_Question].problem_question_3);
      }

      //get Question Targets
      if (this.problem_set[this.num_Question].problem_question_1_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_Question].problem_question_1_target);
      }
      if (this.problem_set[this.num_Question].problem_question_2_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_Question].problem_question_2_target);
      }
      if (this.problem_set[this.num_Question].problem_question_3_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_Question].problem_question_3_target);
      }

      //get Answers
      if (this.problem_set[this.num_Question].problem_answer_1 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_Question].problem_answer_1);
      }
      if (this.problem_set[this.num_Question].problem_answer_2 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_Question].problem_answer_2);
      }
      if (this.problem_set[this.num_Question].problem_answer_3 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_Question].problem_answer_3);
      }


    }
    else if (this.cur_problem.problem_type == 2) {
      //填空题
    }
    else if (this.cur_problem.problem_type == 3) {
      //选择题
    }
    else {
      //error
    }

  }

  getElement() {
    this.math_formlua_element = document.getElementById("math-formula");
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formlua_img_element.push(document.getElementById("math-formula-img-" + i));
    }
    this.math_formlua_img_element[0].style.display = "block";
    this.problem_text_element = document.getElementById("problem-text");
    this.symbol_input_element = document.getElementById("symbol-input");
    for (var i = 0; i < this.cur_problem.problem_questions.length; i++) {
      this.problem_questions_element.push(document.getElementById("problem-question-" + i));
    }
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      this.problem_questions_target_element.push(document.getElementById("problem-questions-target-" + i));
    }
  }

  showProblem() {
    katex.render(this.cur_problem.problem_text, this.problem_text_element);
    for (var i = 0; i < this.cur_problem.problem_questions.length; i++) {
      katex.render(this.cur_problem.problem_questions[i], this.problem_questions_element[i]);
    }
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      katex.render(this.cur_problem.problem_questions_target[i], this.problem_questions_target_element[i]);
    }
  }

  showSymbolInput() {
    if (this.symbol_input_element.style.display == "block") {
      this.symbol_input_element.style.display = "none";
    }
    else {
      this.symbol_input_element.style.display = "block";
    }
  }

  readProblems() {
    return null;
  }

  selectProblems() {
    return null;
  }

  nextProblem() {
    this.num_Question++;
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

}
