import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarLoggedInComponent } from './navigation-bar-logged-in.component';

describe('NavigationBarLoggedInComponent', () => {
  let component: NavigationBarLoggedInComponent;
  let fixture: ComponentFixture<NavigationBarLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
