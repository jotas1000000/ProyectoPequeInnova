import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherContolPageComponent } from './teacher-contol-page.component';

describe('TeacherContolPageComponent', () => {
  let component: TeacherContolPageComponent;
  let fixture: ComponentFixture<TeacherContolPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherContolPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherContolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
