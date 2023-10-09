import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { CrearTicketComponent } from './crear-ticket/crear-ticket.component';
import { TicketsActivosComponent } from './tickets-activos/tickets-activos.component';
import { TicketsCerradosComponent } from './tickets-cerrados/tickets-cerrados.component';
import { TicketsPendientesComponent } from './tickets-pendientes/tickets-pendientes.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ClientePerfilComponent,
    CrearTicketComponent,
    TicketsActivosComponent,
    TicketsCerradosComponent,
    TicketsPendientesComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
