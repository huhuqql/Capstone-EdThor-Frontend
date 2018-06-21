import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionReportComponent } from './long-question-report.component';

describe('LongQuestionReportComponent', () => {
  let component: LongQuestionReportComponent;
  let fixture: ComponentFixture<LongQuestionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
