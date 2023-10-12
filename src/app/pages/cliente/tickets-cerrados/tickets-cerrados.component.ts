import { Component, TemplateRef,OnInit,ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-tickets-cerrados',
  templateUrl: './tickets-cerrados.component.html',
  styleUrls: ['./tickets-cerrados.component.css']
})
export class TicketsCerradosComponent {
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

  constructor(private http: HttpClient, private modal: NzModalService) {}

  ngOnInit(): void {
    this.http.get<Person[]>('assets/data/features/ticket-table.json').subscribe(
      (data) => {
        this.people = data;
        this.filteredPeople = data;
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
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

  private applyFilters(): Person[] {
    return this.people.filter((person) =>
      person.name.toLowerCase().includes(this.contactSearchValue.toLowerCase()) &&
      (this.statusFilter === 'all' || person.actions.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.modalRef = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => console.log('Click ok')
    });
  }
}
