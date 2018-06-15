import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankCheckComponent } from './fill-in-blank-check.component';

describe('FillInBlankCheckComponent', () => {
  let component: FillInBlankCheckComponent;
  let fixture: ComponentFixture<FillInBlankCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
