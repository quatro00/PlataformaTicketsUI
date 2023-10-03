import { Component, TemplateRef } from '@angular/core';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {
  isLoading = true;
  showContent = false;

  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: SucursalModel[] = [];
  filteredData: SucursalModel[] = [];


  constructor( 
    private sucursalService: SucursalService,
    private modalService: NzModalService
    ) {}

  ngOnInit() {
    // Simulate loading time
    this.loadData();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    this.sucursalService.getSucursales()
    .subscribe({
      next:(response)=>{
        console.log('sucursales', response);
        this.data = response;
        this.filteredData = response;
        
        this.isLoading = false;
        this.showContent = true;
      }
    })

  

    /*
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 1000);
    */
  }

  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  showNew(newItem: TemplateRef<{}>) {
    const modal = this.modalService.create({
        nzTitle: 'Informacion de la sucursal',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Agregar sucursal',
                type: 'primary',
                onClick: () => this.modalService.confirm(
                    {
                        nzTitle: 'Are you sure you want to create this project?',
                        nzOnOk: () => this.modalService.closeAll()
                    }
                )
            },
        ],
        nzWidth: 620
    })
}

  private applyFilters(): SucursalModel[] {
    return this.data.filter((data) =>
      data.nombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data.clave.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }
}
