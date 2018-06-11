import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongQuestionComponent } from './long-question.component';

describe('LongQuestionComponent', () => {
  let component: LongQuestionComponent;
  let fixture: ComponentFixture<LongQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
