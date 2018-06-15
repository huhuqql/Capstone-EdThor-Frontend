import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankComponent } from './fill-in-blank.component';

describe('FillInBlankComponent', () => {
  let component: FillInBlankComponent;
  let fixture: ComponentFixture<FillInBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
