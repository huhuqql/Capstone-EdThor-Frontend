import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionCheckComponent } from './long-question-check.component';

describe('LongQuestionCheckComponent', () => {
  let component: LongQuestionCheckComponent;
  let fixture: ComponentFixture<LongQuestionCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
