import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceReportAnswerComponent } from './multiple-choice-report-answer.component';

describe('MultipleChoiceReportAnswerComponent', () => {
  let component: MultipleChoiceReportAnswerComponent;
  let fixture: ComponentFixture<MultipleChoiceReportAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceReportAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceReportAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
