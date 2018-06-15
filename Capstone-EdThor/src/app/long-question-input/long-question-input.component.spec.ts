import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionInputComponent } from './long-question-input.component';

describe('LongQuestionInputComponent', () => {
  let component: LongQuestionInputComponent;
  let fixture: ComponentFixture<LongQuestionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
