import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionStepCheckComponent } from './long-question-step-check.component';

describe('LongQuestionStepCheckComponent', () => {
  let component: LongQuestionStepCheckComponent;
  let fixture: ComponentFixture<LongQuestionStepCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionStepCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionStepCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
