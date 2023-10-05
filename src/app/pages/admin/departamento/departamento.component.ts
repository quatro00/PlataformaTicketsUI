import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
   //private sucursalService: SucursalService,
    private modalService: NzModalService
    ) {}

  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      clave: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      telefono2: ['',[Validators.required]],
    });

    this.loadData();
  }

  loadData() {

    this.isLoading = false;
        this.showContent = true;
        
    // Simulate an asynchronous data loading operation
    //carga de data para la tabla
    /*
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
    */
  }

  private applyFilters(): any[] {
    return this.data.filter((data) =>
      data.nombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data.clave.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }

  //metodos para la forma
  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
    const modal = this.modalService.create({
        nzTitle: 'Informacion de la sucursal',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Agregar sucursal',
                type: 'primary',
                onClick: () => {
                  this.submitForm();
                }
            },
        ],
        nzWidth: 620
    })
  }

  showEdit(newItem: TemplateRef<{}>, sucursal:any) {
    
    this.validateForm.setValue({
      nombre:sucursal.nombre,
      clave:sucursal.clave,
      direccion:sucursal.direccion,
      telefono:sucursal.telefono,
      telefono2:sucursal.telefono2,
    })


    const modal = this.modalService.create({
        nzTitle: 'Informacion de la sucursal',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Actualizar sucursal',
                type: 'primary',
                onClick: () => {
                  this.submitUpdForm(sucursal.id);
                }
            },
        ],
        nzWidth: 620
    })
  }

  submitUpdForm(id:string): void {
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      console.log(this.validateForm);
      
      /*
      var request:SucursalRequestModel = {
        nombre : this.validateForm.value.nombre,
        clave : this.validateForm.value.clave,
        direccion : this.validateForm.value.direccion,
        telefono : this.validateForm.value.telefono,
        telefono2 : this.validateForm.value.telefono2,
        activo : true,
      };
      
      this.sucursalService.updateSucursal(id, request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }
      })
      */
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      console.log(this.validateForm);

      /*
      var request:SucursalRequestModel = {
        nombre : this.validateForm.value.nombre,
        clave : this.validateForm.value.clave,
        direccion : this.validateForm.value.direccion,
        telefono : this.validateForm.value.telefono,
        telefono2 : this.validateForm.value.telefono2,
        activo : true,
      };
      this.sucursalService.createSucursal(request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }
      })
      */
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
