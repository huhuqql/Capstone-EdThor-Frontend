import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceReportComponent } from './multiple-choice-report.component';

describe('MultipleChoiceReportComponent', () => {
  let component: MultipleChoiceReportComponent;
  let fixture: ComponentFixture<MultipleChoiceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
