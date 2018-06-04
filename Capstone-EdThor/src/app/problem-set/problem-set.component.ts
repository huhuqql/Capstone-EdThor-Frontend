import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
import * as problems from '../../assets/files/questions.json';

import * as problemjs from './problem-set.js';

@Component({
  selector: 'app-problem-set',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css']
})
export class ProblemSetComponent implements OnInit {
  private sub: any;
  cur_problem: any;
  topic: any;
  topic_name: any;
  problem_set: any;
  problem_questions: string[] = [];
  problem_questions_target: string[] = [];

  num: number = 0;
  problem_text: string = "";


  constructor(private route: ActivatedRoute, private global: GlobalsService) {
    this.sub = this.route.params.subscribe(params => {
      this.topic = params['topic'];
    });
  }

  ngOnInit() {
    // problemjs.test();
    this.topic_name = problems[0].problem_topic_name;
    this.problem_set = problems;
    this.cur_problem = this.problem_set[this.num];
    this.problem_text = this.cur_problem.problem_text;
    console.log(this.problem_text);
    if (this.cur_problem.problem_type == 1) {

      if (this.cur_problem.problem_question_1 != null) {
        this.problem_questions.push(this.cur_problem.problem_question_1);
      }
      if (this.cur_problem.problem_question_2 != null) {
        this.problem_questions.push(this.cur_problem.problem_question_2);
      }
      if (this.cur_problem.problem_question_3 != "") {
        this.problem_questions.push(this.cur_problem.problem_question_3);
      }
      if (this.cur_problem.problem_question_4 != "") {
        this.problem_questions.push(this.cur_problem.problem_question_4);
      }

      if (this.cur_problem.problem_question_1_target != null) {
        this.problem_questions_target.push(this.cur_problem.problem_question_1_target);
      }
      if (this.cur_problem.problem_question_2 != null) {
        this.problem_questions_target.push(this.cur_problem.problem_question_2_target);
      }
      if (this.cur_problem.problem_question_3 != "") {
        this.problem_questions_target.push(this.cur_problem.problem_question_3_target);
      }
      if (this.cur_problem.problem_question_4 != "") {
        this.problem_questions_target.push(this.cur_problem.problem_question_4_target);
      }

      console.log(this.problem_questions);
    }
  }

  showSymbolInput(){
    var text = document.getElementById("symbol-input");
    if(text.style.display == "block"){
      text.style.display = "none";
    }
    else{
      text.style.display = "block";
    }

    // problemjs.showSymbolInput();
    
  }

  readProblems() {
    return null;
  }

  selectProblems() {
    return null;
  }

  nextProblem() {
    this.num++;
  }

  showProblem() {

  }

}
