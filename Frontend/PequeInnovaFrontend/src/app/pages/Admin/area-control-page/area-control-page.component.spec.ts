import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaControlPageComponent } from './area-control-page.component';

describe('AreaControlPageComponent', () => {
  let component: AreaControlPageComponent;
  let fixture: ComponentFixture<AreaControlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaControlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
