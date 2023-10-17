import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { DashboardComponent } from '../supervisor/dashboard/dashboard.component';
import { TicketsAbiertosComponent } from './tickets-abiertos/tickets-abiertos.component';
import { TicketsAsignadosComponent } from './tickets-asignados/tickets-asignados.component';
import { TicketsPorAsignarComponent } from './tickets-por-asignar/tickets-por-asignar.component';
import { TicketsCerradosComponent } from './tickets-cerrados/tickets-cerrados.component';
import { SupervisorPerfilComponent } from './supervisor-perfil/supervisor-perfil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HttpClientModule } from '@angular/common/http';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PerfectScrollbarModule } from 'ngx-om-perfect-scrollbar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { SupervisordashboardComponent } from './supervisordashboard/supervisordashboard.component';
import { TicketDetalleComponent } from './ticket-detalle/ticket-detalle.component';

const antdModule = [
  NzUploadModule,
  NzCascaderModule,
  NzPaginationModule,
  PerfectScrollbarModule,
  NzDropDownModule,
  AngularSvgIconModule.forRoot(),
  NgChartsModule,
  NgApexchartsModule,
  NzLayoutModule,
  NzGridModule,
  NzSkeletonModule,
  SupervisorRoutingModule,
  NzModalModule,
  //FeaturesRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  NzInputModule,
  NzFormModule,
  EditorModule,
  //NzInputNumberModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzSelectModule,
 //NzUploadModule,
  NzCheckboxModule,
  NzRadioModule,
  NzTagModule,
  NzSwitchModule,
  //NzSliderModule,
  NzTableModule,
  //EditorModule,
  //DashboardModule,
  //AppsModule,
  NzProgressModule,
  NzAvatarModule,
  NzToolTipModule,
  //NzStepsModule,
  //GoogleMapsModule
  NzMessageModule,
  NzCollapseModule

]

@NgModule({
  declarations: [
    DashboardComponent,
    TicketsAbiertosComponent,
    TicketsAsignadosComponent,
    TicketsPorAsignarComponent,
    TicketsCerradosComponent,
    SupervisorPerfilComponent,
    
    SupervisordashboardComponent,
         TicketDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzCardModule,
    HttpClientModule,
    NzSliderModule,
    ...antdModule,
  ],
  providers: [
    NzMessageService
  ]
})
export class SupervisorModule { }
