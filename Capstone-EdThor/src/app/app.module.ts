import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KatexModule } from 'ng-katex';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MemberComponent} from './member/member.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MemberService} from "./service/member.service";
import {environment} from "../environments/environment";
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
    MultipleChoiceSolutionStepsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KatexModule,
    BrowserAnimationsModule
  ],
  providers: [
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
