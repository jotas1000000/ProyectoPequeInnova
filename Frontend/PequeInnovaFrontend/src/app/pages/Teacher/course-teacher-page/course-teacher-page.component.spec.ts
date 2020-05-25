import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherPageComponent } from './course-teacher-page.component';

describe('CourseTeacherPageComponent', () => {
  let component: CourseTeacherPageComponent;
  let fixture: ComponentFixture<CourseTeacherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
