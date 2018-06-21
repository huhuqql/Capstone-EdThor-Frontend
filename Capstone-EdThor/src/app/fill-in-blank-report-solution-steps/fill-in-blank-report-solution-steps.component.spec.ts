import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankReportSolutionStepsComponent } from './fill-in-blank-report-solution-steps.component';

describe('FillInBlankReportSolutionStepsComponent', () => {
  let component: FillInBlankReportSolutionStepsComponent;
  let fixture: ComponentFixture<FillInBlankReportSolutionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankReportSolutionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankReportSolutionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
