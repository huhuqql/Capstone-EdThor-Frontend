import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlankReportComponent } from './fill-in-blank-report.component';

describe('FillInBlankReportComponent', () => {
  let component: FillInBlankReportComponent;
  let fixture: ComponentFixture<FillInBlankReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInBlankReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInBlankReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
