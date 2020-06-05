import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseTeacherComponent } from './edit-course-teacher.component';

describe('EditCourseTeacherComponent', () => {
  let component: EditCourseTeacherComponent;
  let fixture: ComponentFixture<EditCourseTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
