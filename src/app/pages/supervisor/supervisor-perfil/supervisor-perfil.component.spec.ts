import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorPerfilComponent } from './supervisor-perfil.component';

describe('SupervisorPerfilComponent', () => {
  let component: SupervisorPerfilComponent;
  let fixture: ComponentFixture<SupervisorPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorPerfilComponent]
    });
    fixture = TestBed.createComponent(SupervisorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
