import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    DashboardComponent,
    ProblemSetComponent,
    TestComponent,
    MathFormulaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KatexModule
  ],
  providers: [
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
