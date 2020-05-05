import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolControlPageComponent } from './school-control-page.component';

describe('SchoolControlPageComponent', () => {
  let component: SchoolControlPageComponent;
  let fixture: ComponentFixture<SchoolControlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolControlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
