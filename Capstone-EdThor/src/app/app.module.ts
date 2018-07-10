import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { KatexModule } from 'ng-katex';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MemberService } from "./service/member.service";
import { environment } from "../environments/environment";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProblemSetComponent } from './problem-set/problem-set.component';
import { TestComponent } from './test/test.component';
import { MathFormulaComponent } from './math-formula/math-formula.component';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { LongQuestionComponent } from './long-question/long-question.component';
import { MultipleChoiceOptionsComponent } from './multiple-choice-options/multiple-choice-options.component';
import { MultipleChoiceAnswerComponent } from './multiple-choice-answer/multiple-choice-answer.component';
import { MultipleChoiceSolutionStepsComponent } from './multiple-choice-solution-steps/multiple-choice-solution-steps.component';
import { FillInBlankComponent } from './fill-in-blank/fill-in-blank.component';
import { FillInBlankInputComponent } from './fill-in-blank-input/fill-in-blank-input.component';
import { FillInBlankCheckComponent } from './fill-in-blank-check/fill-in-blank-check.component';
import { FillInBlankSolutionStepsComponent } from './fill-in-blank-solution-steps/fill-in-blank-solution-steps.component';
import { LongQuestionInputComponent } from './long-question-input/long-question-input.component';
import { LongQuestionCheckComponent } from './long-question-check/long-question-check.component';
import { LongQuestionStepCheckComponent } from './long-question-step-check/long-question-step-check.component';
import { SummaryComponent } from './summary/summary.component';
import { FillInBlankReportComponent } from './fill-in-blank-report/fill-in-blank-report.component';
import { MultipleChoiceReportComponent } from './multiple-choice-report/multiple-choice-report.component';
import { MultipleChoiceReportAnswerComponent } from './multiple-choice-report-answer/multiple-choice-report-answer.component';
import { MultipleChoiceReportSolutionStepsComponent } from './multiple-choice-report-solution-steps/multiple-choice-report-solution-steps.component';
import { FillInBlankReportAnswerComponent } from './fill-in-blank-report-answer/fill-in-blank-report-answer.component';
import { FillInBlankReportSolutionStepsComponent } from './fill-in-blank-report-solution-steps/fill-in-blank-report-solution-steps.component';
import { LongQuestionReportComponent } from './long-question-report/long-question-report.component';
import { LongQuestionReportAnswerComponent } from './long-question-report-answer/long-question-report-answer.component';
import { LongQuestionReportSolutionStepsComponent } from './long-question-report-solution-steps/long-question-report-solution-steps.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    DashboardComponent,
    ProblemSetComponent,
    TestComponent,
    MathFormulaComponent,
    MultipleChoiceComponent,
    LongQuestionComponent,
    MultipleChoiceOptionsComponent,
    MultipleChoiceAnswerComponent,
    MultipleChoiceSolutionStepsComponent,
    FillInBlankComponent,
    FillInBlankInputComponent,
    FillInBlankCheckComponent,
    FillInBlankSolutionStepsComponent,
    LongQuestionInputComponent,
    LongQuestionCheckComponent,
    LongQuestionStepCheckComponent,
    SummaryComponent,
    FillInBlankReportComponent,
    MultipleChoiceReportComponent,
    MultipleChoiceReportAnswerComponent,
    MultipleChoiceReportSolutionStepsComponent,
    FillInBlankReportAnswerComponent,
    FillInBlankReportSolutionStepsComponent,
    LongQuestionReportComponent,
    LongQuestionReportAnswerComponent,
    LongQuestionReportSolutionStepsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KatexModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
    MemberService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
