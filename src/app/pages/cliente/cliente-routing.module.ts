import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { CrearTicketComponent } from './crear-ticket/crear-ticket.component';
import { TicketsActivosComponent } from './tickets-activos/tickets-activos.component';
import { TicketsCerradosComponent } from './tickets-cerrados/tickets-cerrados.component';
import { TicketsPendientesComponent } from './tickets-pendientes/tickets-pendientes.component';
import { TicketDetalleComponent } from './ticket-detalle/ticket-detalle.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Dasbboard',
    }
  },
  {
    path: 'perfil',
    component: ClientePerfilComponent,
    data: {
        title: 'Perfil',
    }
  },
  {
    path: 'crearticket',
    component: CrearTicketComponent,
    data: {
        title: 'Crear ticket',
    }
  },
  {
    path: 'tickets-activos',
    component: TicketsActivosComponent,
    data: {
        title: 'Tickets activos',
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
    path: 'tickets-pendientes',
    component: TicketsPendientesComponent,
    data: {
        title: 'tickets pendientes',
    }
  },
  {
    path: 'ticket-detalle',
    component: TicketDetalleComponent,
    data: {
        title: '  ',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
