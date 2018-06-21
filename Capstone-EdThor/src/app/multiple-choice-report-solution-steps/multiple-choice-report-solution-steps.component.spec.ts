import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceReportSolutionStepsComponent } from './multiple-choice-report-solution-steps.component';

describe('MultipleChoiceReportSolutionStepsComponent', () => {
  let component: MultipleChoiceReportSolutionStepsComponent;
  let fixture: ComponentFixture<MultipleChoiceReportSolutionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceReportSolutionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceReportSolutionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
