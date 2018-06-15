import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankSolutionStepsComponent } from './fill-in-blank-solution-steps.component';

describe('FillInBlankSolutionStepsComponent', () => {
  let component: FillInBlankSolutionStepsComponent;
  let fixture: ComponentFixture<FillInBlankSolutionStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankSolutionStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankSolutionStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
