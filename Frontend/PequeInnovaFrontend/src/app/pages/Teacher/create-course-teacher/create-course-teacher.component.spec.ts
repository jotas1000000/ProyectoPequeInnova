import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseTeacherComponent } from './create-course-teacher.component';

describe('CreateCourseTeacherComponent', () => {
  let component: CreateCourseTeacherComponent;
  let fixture: ComponentFixture<CreateCourseTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
