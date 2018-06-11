import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceSolutionStepsComponent } from './multiple-choice-solution-steps.component';

describe('MultipleChoiceSolutionStepsComponent', () => {
  let component: MultipleChoiceSolutionStepsComponent;
  let fixture: ComponentFixture<MultipleChoiceSolutionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceSolutionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceSolutionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
