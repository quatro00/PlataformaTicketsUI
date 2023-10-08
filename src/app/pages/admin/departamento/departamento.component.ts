import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { DepartamentoModel } from 'src/app/models/departamento/departamento-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
 
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

  sucursales:SucursalModel[] = [];
  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
    private departamentoService: DepartamentoService,
    private sucursalService: SucursalService,
    private modalService: NzModalService,
    private router: Router, 
    ) {}

  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      sucursalId: ['',[Validators.required]],
      clave: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      telefono: ['',[Validators.required]]
    });

    this.loadData();
  }

  loadData() {

    this.isLoading = false;
        this.showContent = true;
        
    // Simulate an asynchronous data loading operation
    //carga de data para la tabla
    this.sucursalService.getSucursales()
    .subscribe({
      next:(response)=>{
        this.sucursales = response;
      }
    })
    this.departamentoService.getAll()
    .subscribe({
      next:(response)=>{
        //console.log('departamentos', response);
        this.data = response;
        this.filteredData = response;
        
        this.isLoading = false;
        this.showContent = true;
      }
    })
  }

  private applyFilters(): any[] {
    
    return this.data.filter((data2) =>
      data2.descripcion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.sucursal.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.sucursalClave.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.clave.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
    );
  }

  //metodos para la forma
  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
    const modal = this.modalService.create({
        nzTitle: 'Información del departamento',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Agregar departamento',
                type: 'primary',
                onClick: () => {
                  this.submitForm();
                }
            },
        ],
        nzWidth: 620
    })
  }

  navigateToAreas(departamentoId:any) {
    console.log(departamentoId);
    this.router.navigateByUrl(`administrador/departamento/area/${departamentoId}`); 
/*
    this.router.navigate(
      ['/administrador/departamento/area'],
      { queryParams: { 'departamentoId': departamentoId } }
    );
*/
  }

  showEdit(newItem: TemplateRef<{}>, model:any) {
    console.log(model);
    this.validateForm.setValue({
      descripcion:model.descripcion,
      clave:model.clave,
      telefono:model.telefono,
      sucursalId:model.sucursalId,
    })

    const modal = this.modalService.create({
        nzTitle: 'Información del departamento',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Actualizar departamento',
                type: 'primary',
                onClick: () => {
                  this.submitUpdForm(model.id);
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
      
      
      var request:DepartamentoModel = {
        id : '',
        clave : this.validateForm.value.clave,
        descripcion : this.validateForm.value.descripcion,
        telefono : this.validateForm.value.telefono,
        sucursalId : this.validateForm.value.sucursalId,
        activo : true,
      };
      
      this.departamentoService.update(id, request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }
      })
      
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

      
      var request:DepartamentoModel = {
        id : '',
        clave : this.validateForm.value.clave,
        descripcion : this.validateForm.value.descripcion,
        telefono : this.validateForm.value.telefono,
        sucursalId : this.validateForm.value.sucursalId,
        activo : true,
      };
      
      
      this.departamentoService.create(request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
        }
      })
      
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
