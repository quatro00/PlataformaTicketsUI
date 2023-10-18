import { Component, TemplateRef,OnInit,ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketModel } from 'src/app/models/ticket/ticket-model';



@Component({
  selector: 'app-supervisordashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('tplTitle') tplTitle!: TemplateRef<{}>;
  @ViewChild('tplContent') tplContent!: TemplateRef<{}>;
  @ViewChild('tplFooter') tplFooter!: TemplateRef<{}>;

  value = '';
  statusFilter = '';
  contactSearchValue = '';
  people: any[] = [];
  filteredPeople: any[] = [];
  selectedValue = null;
  modalRef: NzModalRef;

  ticketsTotales:number = 0;
  ticketsActivos:number = 0;
  ticketsEnEspera:number = 0;
  ticketsCerrados:number = 0;
  isVisibleTop:boolean = false;
  ticketDetalle:TicketModel;

  constructor(private http: HttpClient, private modal: NzModalService, private ticketService:TicketService) {}

  ngOnInit(): void {
   

    this.ticketService.getTicketsSupervisorByEstatus(0)
    .subscribe({
      next:(response)=>{
        console.log(response);
        
        this.ticketsActivos = response.filter(x=>x.estatus == 'Abierto').length;
        this.ticketsEnEspera = response.filter(x=>x.estatus == 'En atención' || x.estatus == 'Pendiente').length;
        this.ticketsCerrados = response.filter(x=>x.estatus == 'Cerrado').length;

        this.people = response;
        this.filteredPeople = response;
      }
    })

  }

  searchById(): void {
    if (this.value) {
      this.filteredPeople = this.people.filter(
        (person) => person.id === this.value
      );
    } else {
      this.filteredPeople = this.people;
    }
  }

  filterByContact(): void {
    this.filteredPeople = this.applyFilters();
  }

  filterByStatus(): void {
    this.filteredPeople = this.applyFilters();
  }

  private applyFilters(): any[] {
    return this.people.filter((person) =>
      person.folio.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.solicitante.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.categoria.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.subcategoria.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.departamento.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.area.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.titulo.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.prioridad.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      person.estatus.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase())
      
    );
  }

  showModalTop(id:string): void {
    this.ticketService.getSupervisorTicketDetalle(id)
  .subscribe({
    next:(response)=>{
      this.ticketDetalle = response;
      this.isVisibleTop = true;
    }})

   
  }

  handleOkTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }
  
}
