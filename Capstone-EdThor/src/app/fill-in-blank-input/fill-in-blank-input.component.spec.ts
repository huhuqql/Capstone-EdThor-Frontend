import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankInputComponent } from './fill-in-blank-input.component';

describe('FillInBlankInputComponent', () => {
  let component: FillInBlankInputComponent;
  let fixture: ComponentFixture<FillInBlankInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
