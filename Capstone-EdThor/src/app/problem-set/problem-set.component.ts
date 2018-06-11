import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';

import { Problem } from '../service/model/problem';

export declare var MathQuill;
export declare var katex;

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent implements OnInit, OnDestroy {

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
    problem_solution_steps: ""
  };

  topic: any;
  topic_name: any;
  problem_set: any[] = [];
  num_problem: number = 0;
  currentMathFormula: number = 0;
  math_formula: any[] = [];
  MQ: any;
  answerMathField: any[] = [];
  cur_answerMathField: number;
  cur_step: number = 0;


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

  private multiple_choice_options_element: any;

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
    this.problem_set.push(problems[0]);
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formula.push("../../assets/img/mathformula/" + i + ".jpg");
    }
    this.getQuestion();
    console.log("getQuestion!");
  }

  ngAfterViewInit() { // or some event handler
    if (this.cur_problem.problem_type == 1) {
      this.getElement();
      this.showProblem();
      this.showInstruction();
      this.initSymbolInput();
      this.showProblemTarget();
      this.showCheckAnswerButton();
    }
    else if (this.cur_problem.problem_type == 2) {

    }
    else if (this.cur_problem.problem_type == 3) {
      this.getElement();
      this.showProblem();
      this.showInstruction();
      this.showCheckAnswerButton();
      this.showMultipleChoiceOptions();
    }
  }

  getQuestion() {
    //计算题
    this.cur_problem.problem_id = this.problem_set[this.num_problem].problem_id;
    this.cur_problem.problem_type = this.problem_set[this.num_problem].problem_type;
    this.cur_problem.problem_type_name = this.problem_set[this.num_problem].problem_type_name;
    this.cur_problem.problem_text = this.num_problem + 1 + "." + this.problem_set[this.num_problem].problem_text;
    if (this.cur_problem.problem_type == 1) {
      this.cur_problem.problem_instruction = this.problem_set[this.num_problem].problem_instruction;

      //get Questions
      if (this.problem_set[this.num_problem].problem_question_1 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_1);
      }
      if (this.problem_set[this.num_problem].problem_question_2 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_2);
      }
      if (this.problem_set[this.num_problem].problem_question_3 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_3);
      }

      //get Question Targets
      if (this.problem_set[this.num_problem].problem_question_1_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_problem].problem_question_1_target);
      }
      if (this.problem_set[this.num_problem].problem_question_2_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_problem].problem_question_2_target);
      }
      if (this.problem_set[this.num_problem].problem_question_3_target != "") {
        this.cur_problem.problem_questions_target.push(this.problem_set[this.num_problem].problem_question_3_target);
      }

      //get Answers
      if (this.problem_set[this.num_problem].problem_answer_1 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_problem].problem_answer_1);
      }
      if (this.problem_set[this.num_problem].problem_answer_2 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_problem].problem_answer_2);
      }
      if (this.problem_set[this.num_problem].problem_answer_3 != "") {
        this.cur_problem.problem_answers.push(this.problem_set[this.num_problem].problem_answer_3);
      }

      //get Answer Instruction
      if (this.problem_set[this.num_problem].problem_instruction != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_instruction);
      }
      if (this.problem_set[this.num_problem].problem_answer_instruction_1 != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_answer_instruction_1);
      }
      if (this.problem_set[this.num_problem].problem_answer_instruction_2 != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_answer_instruction_2);
      }
      if (this.problem_set[this.num_problem].problem_answer_instruction_3 != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_answer_instruction_3);
      }

    }
    else if (this.cur_problem.problem_type == 2) {
      //填空题
    }
    else if (this.cur_problem.problem_type == 3) {
      //选择题

      //get Questions
      if (this.problem_set[this.num_problem].problem_question_1 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_1);
      }
      if (this.problem_set[this.num_problem].problem_question_2 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_2);
      }
      if (this.problem_set[this.num_problem].problem_question_3 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_3);
      }
      if (this.problem_set[this.num_problem].problem_question_4 != "") {
        this.cur_problem.problem_questions.push(this.problem_set[this.num_problem].problem_question_4);
      }

      //get Answer Instruction
      if (this.problem_set[this.num_problem].problem_instruction != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_instruction);
      }
      if (this.problem_set[this.num_problem].problem_answer_instruction != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_answer_instruction);
      }
      if (this.problem_set[this.num_problem].problem_solution_instruction != "") {
        this.cur_problem.problem_answer_instruction.push(this.problem_set[this.num_problem].problem_solution_instruction);
      }
      console.log(this.cur_problem.problem_answer_instruction);
    }
    else {
      //error
    }

  }

  getElement() {
    this.target_element = document.getElementById("target");
    this.math_formlua_element = document.getElementById("math-formula");
    for (var i = 0; i < this.global.MATHFORMULA_NUM; i++) {
      this.math_formlua_img_element.push(document.getElementById("math-formula-img-" + i));
    }
    this.math_formlua_img_element[0].style.display = "block";
    this.problem_text_element = document.getElementById("problem-text");
    this.problem_instruction = document.getElementById("problem-instruction");
    this.symbol_input_element = document.getElementById("symbol-input");
    for (var i = 0; i < this.cur_problem.problem_questions.length; i++) {
      this.problem_questions_element.push(document.getElementById("problem-question-" + i));
    }
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      this.problem_questions_target_element.push(document.getElementById("problem-questions-target-" + i));
      this.problem_questions_target_input_element.push(document.getElementById("problem-questions-target-input-" + i));
    }
    this.check_answer_options_element = document.getElementById("check-answer-options");
    this.check_answer_button = document.getElementById("check-answer-button");
    this.next_step_button = document.getElementById("next-step-button");
    this.check_solution_button = document.getElementById("check-solution-button");
    this.multiple_choice_options_element = document.getElementById("multiple-choice-options");
  }

  showCheckAnswerButton() {
    this.check_answer_button.style.display = "block";
  }

  hideCheckAnswerButton() {
    this.check_answer_button.style.display = "none";
  }

  showNextStepButton() {
    this.next_step_button.style.display = "block";
  }

  hideNextStepButton() {
    this.next_step_button.style.display = "none";
  }

  showCheckSolutionButton() {
    this.check_solution_button.style.display = "block";
  }

  disableCheckSolutionButton() {
    this.check_solution_button.disabled = true;
  }

  enableCheckSolutionButton() {
    this.check_solution_button.disabled = false;
  }

  hideCheckSolutionButton() {
    this.check_solution_button.style.display = "none";
  }

  showInstruction() {
    console.log(this.cur_problem.problem_answer_instruction[this.cur_step]);
    katex.render(this.cur_problem.problem_answer_instruction[this.cur_step], this.problem_instruction);
  }

  showProblem() {
    katex.render(this.cur_problem.problem_text, this.problem_text_element);
    if (this.cur_problem.problem_type == 1) {
      for (var i = 0; i < this.cur_problem.problem_questions.length; i++) {
        katex.render(this.cur_problem.problem_questions[i], this.problem_questions_element[i]);
      }
    }
    else if (this.cur_problem.problem_type == 2) {

    }
    else if (this.cur_problem.problem_type == 3) {
      for (var i = 0; i < this.cur_problem.problem_questions.length; i++) {
        katex.render(this.cur_problem.problem_questions[i], this.problem_questions_element[i]);
      }
      console.log("showProblem");
    }
  }

  showProblemTarget() {
    for (var i = 0; i < this.cur_problem.problem_questions_target.length; i++) {
      katex.render(this.cur_problem.problem_questions_target[i], this.problem_questions_target_element[i]);
    }
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

  nextProblem() {
    this.num_problem++;
  }

  showAnswer() {
    this.cur_step++;
    this.showInstruction();
    if (this.cur_problem.problem_type == 1) {
      if (this.cur_step == 1 && this.cur_step != this.cur_problem.problem_questions.length) {
        this.target_element.style.display = "none";
        this.check_answer_options_element.style.display = "block";
        this.hideCheckAnswerButton();
        this.showCheckSolutionButton();
        this.showNextStepButton();
        this.disableCheckSolutionButton();
      }
      else if (this.cur_step == this.cur_problem.problem_questions.length) {
        this.enableCheckSolutionButton();
      }
    }
    else if (this.cur_problem.problem_type == 2) {

    }
    else if (this.cur_problem.problem_type == 3) {

    }

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

  showMultipleChoiceOptions(){
    this.multiple_choice_options_element.style.display = "block";
  }


  nextStep(){
    if (this.cur_problem.problem_type == 1) {

    }
    else if (this.cur_problem.problem_type == 2) {

    }
    else if (this.cur_problem.problem_type == 3) {
      if(this.cur_step < 3){
        this.cur_step++;
        this.showProblem();
      }
    }
  }
}
