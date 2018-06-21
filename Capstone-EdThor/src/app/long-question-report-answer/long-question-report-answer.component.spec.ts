import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionReportAnswerComponent } from './long-question-report-answer.component';

describe('LongQuestionReportAnswerComponent', () => {
  let component: LongQuestionReportAnswerComponent;
  let fixture: ComponentFixture<LongQuestionReportAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionReportAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionReportAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
