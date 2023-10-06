import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { PrioridadModel } from 'src/app/models/prioridad/prioridad-model';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.css'],
  styles: [`
    :host ::ng-deep nz-slider .ant-slider .ant-slider-rail{
      @apply bg-primary/10;
    }
    :host ::ng-deep nz-slider .ant-slider .ant-slider-track{
      @apply bg-primary;
    }
    :host ::ng-deep nz-slider .ant-slider .ant-slider-handle{
      @apply border-primary border-2 bg-white dark:bg-white/10 w-[16px] h-[16px];
    }
  `]
})
export class PrioridadComponent {
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
    private prioridadService: PrioridadService,
    private sucursalService: SucursalService,
    private modalService: NzModalService
    ) {}
    ngOnInit() {
      // Simulate loading time
      this.validateForm = this.fb.group({
        sucursalId: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        descripcion: ['',[Validators.required]],
        tiempoDeAtencion: ['',[Validators.required]],
        prioridad: ['36',[Validators.required]],
        color: ['',[Validators.required]],
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
      this.prioridadService.getAll()
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
      //this.validateForm.reset();

      /*
      this.validateForm.setValue({
        prioridad:33
      })
      */
      const modal = this.modalService.create({
          nzTitle: 'Información de la prioridad',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Agregar prioridad',
                  type: 'primary',
                  onClick: () => {
                    this.submitForm();
                  }
              },
          ],
          nzWidth: 620
      })
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
          nzTitle: 'Información de la prioridad',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Actualizar prioridad',
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
      console.log(this.validateForm);
      if (this.validateForm.valid) {
        console.log(this.validateForm);
        
        
        var request:PrioridadModel = {
          id : '',
          sucursalId : this.validateForm.value.sucursalId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          tiempoDeAtencion: this.validateForm.value.tiempoDeAtencion,
          nivelDePrioridad: this.validateForm.value.nivelDePrioridad,
          color: this.validateForm.value.color,
          activo : true,
        };
        
        this.prioridadService.update(id, request)
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
  
        /*
        var request:PrioridadModel = {
          id : '',
          sucursalId : this.validateForm.value.sucursalId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          tiempoDeAtencion: this.validateForm.value.tiempoDeAtencion,
          nivelDePrioridad: this.validateForm.value.nivelDePrioridad,
          color: this.validateForm.value.color,
          activo : true,
        };
        
        
        this.prioridadService.create(request)
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
  
