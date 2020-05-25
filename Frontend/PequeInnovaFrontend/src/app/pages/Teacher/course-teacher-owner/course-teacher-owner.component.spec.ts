import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherOwnerComponent } from './course-teacher-owner.component';

describe('CourseTeacherOwnerComponent', () => {
  let component: CourseTeacherOwnerComponent;
  let fixture: ComponentFixture<CourseTeacherOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
