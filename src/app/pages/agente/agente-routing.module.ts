import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientePerfilComponent } from '../cliente/cliente-perfil/cliente-perfil.component';
import { SupervisorPerfilComponent } from '../supervisor/supervisor-perfil/supervisor-perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Agente',
    }
  },
  {
    path: 'perfil',
    component: SupervisorPerfilComponent,
    data: {
        title: 'Agente',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenteRoutingModule { }
