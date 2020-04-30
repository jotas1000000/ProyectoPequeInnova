import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseControlPageComponent } from './course-control-page.component';

describe('CourseControlPageComponent', () => {
  let component: CourseControlPageComponent;
  let fixture: ComponentFixture<CourseControlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseControlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
