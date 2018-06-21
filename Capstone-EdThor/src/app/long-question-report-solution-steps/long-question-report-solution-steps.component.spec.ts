import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionReportSolutionStepsComponent } from './long-question-report-solution-steps.component';

describe('LongQuestionReportSolutionStepsComponent', () => {
  let component: LongQuestionReportSolutionStepsComponent;
  let fixture: ComponentFixture<LongQuestionReportSolutionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionReportSolutionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionReportSolutionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
