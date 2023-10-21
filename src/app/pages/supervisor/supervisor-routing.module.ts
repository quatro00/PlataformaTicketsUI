import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorPerfilComponent } from './supervisor-perfil/supervisor-perfil.component';
import { TicketsAbiertosComponent } from './tickets-abiertos/tickets-abiertos.component';
import { TicketsAsignadosComponent } from './tickets-asignados/tickets-asignados.component';
import { TicketsCerradosComponent } from './tickets-cerrados/tickets-cerrados.component';
import { TicketsPorAsignarComponent } from './tickets-por-asignar/tickets-por-asignar.component';
import { DashboardComponent } from '../supervisor/dashboard/dashboard.component';

const routes: Routes = [
 
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Dashboard',
    }
  },
  {
    path: 'perfil',
    component: SupervisorPerfilComponent,
    data: {
        title: 'Perfil',
    }
  },
  {
    path: 'tickets-abiertos',
    component: TicketsAbiertosComponent,
    data: {
        title: 'Tickets abiertos',
    }
  },
  {
    path: 'tickets-pendientes',
    component: TicketsAsignadosComponent,
    data: {
        title: 'Tickets pendientes',
    }
  },
  {
    path: 'tickets-cerrados',
    component: TicketsCerradosComponent,
    data: {
        title: 'Tickets cerrados',
    }
  },
  {
    path: 'tickets-en-atencion',
    component: TicketsPorAsignarComponent,
    data: {
        title: 'Tickets en atencion',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
