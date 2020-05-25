import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTeacherPageComponent } from './area-teacher-page.component';

describe('AreaTeacherPageComponent', () => {
  let component: AreaTeacherPageComponent;
  let fixture: ComponentFixture<AreaTeacherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTeacherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
