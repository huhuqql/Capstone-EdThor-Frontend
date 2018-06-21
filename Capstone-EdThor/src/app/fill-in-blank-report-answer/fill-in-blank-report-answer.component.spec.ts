import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankReportAnswerComponent } from './fill-in-blank-report-answer.component';

describe('FillInBlankReportAnswerComponent', () => {
  let component: FillInBlankReportAnswerComponent;
  let fixture: ComponentFixture<FillInBlankReportAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankReportAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankReportAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
