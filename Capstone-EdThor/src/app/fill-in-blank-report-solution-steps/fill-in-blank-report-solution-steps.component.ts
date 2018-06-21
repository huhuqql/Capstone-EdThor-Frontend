import { Component, Input, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Problem } from '../service/model/problem';

@Component({
  selector: 'app-fill-in-blank-report-solution-steps',
  templateUrl: './fill-in-blank-report-solution-steps.component.html',
  styleUrls: ['./fill-in-blank-report-solution-steps.component.css', '../problem-set/problem-set.component.css', "../../assets/css/bootstrap.min.css"]
})
export class FillInBlankReportSolutionStepsComponent implements OnInit {

  @Input() cur_problem: Problem;


  constructor() { }


  ngOnInit() {

  }

}

