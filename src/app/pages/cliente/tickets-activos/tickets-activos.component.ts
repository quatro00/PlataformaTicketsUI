import { Component, TemplateRef,OnInit,ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/services/ticket.service';

interface Person {
  id: string;
  user: string;
  name: string;
  priority: string;
  createdDate: string;
  employeeCode: string;
  actions: string;
  status: string;
}

@Component({
  selector: 'app-tickets-activos',
  templateUrl: './tickets-activos.component.html',
  styleUrls: ['./tickets-activos.component.css']
})
export class TicketsActivosComponent {
  @ViewChild('tplTitle') tplTitle!: TemplateRef<{}>;
  @ViewChild('tplContent') tplContent!: TemplateRef<{}>;
  @ViewChild('tplFooter') tplFooter!: TemplateRef<{}>;

  value = '';
  statusFilter = '';
  contactSearchValue = '';
  people: Person[] = [];
  filteredPeople: Person[] = [];
  selectedValue = null;
  modalRef: NzModalRef;

  isVisibleTop:boolean = false;

  constructor(
    private http: HttpClient, 
    private ticketService:TicketService,) {}

  ngOnInit(): void {


    this.ticketService.getTicketsByEstatus(1)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.people = response;
        this.filteredPeople = response;
      }
    })
  }

  filterByContact(): void {
    this.filteredPeople = this.applyFilters();
  }

  private applyFilters(): Person[] {
    return this.people.filter((person) =>
      person.name.toLowerCase().includes(this.contactSearchValue.toLowerCase()) &&
      (this.statusFilter === 'all' || person.actions.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  handleOkTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }
  
}
