import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisordashboardComponent } from './supervisordashboard.component';

describe('SupervisordashboardComponent', () => {
  let component: SupervisordashboardComponent;
  let fixture: ComponentFixture<SupervisordashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisordashboardComponent]
    });
    fixture = TestBed.createComponent(SupervisordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
