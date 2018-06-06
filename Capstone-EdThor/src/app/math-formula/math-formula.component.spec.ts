import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathFormulaComponent } from './math-formula.component';

describe('MathFormulaComponent', () => {
  let component: MathFormulaComponent;
  let fixture: ComponentFixture<MathFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
