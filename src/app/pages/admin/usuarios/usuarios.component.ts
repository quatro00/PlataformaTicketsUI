import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { PrioridadModel } from 'src/app/models/prioridad/prioridad-model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario/usuario-model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
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
export class UsuariosComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  roles:any[]=[
    {
      id:'AGENTE',
      nombre:'AGENTE'
    },
    {
      id:'ADMINISTRADOR',
      nombre:'ADMINISTRADOR'
    },
    {
      id:'SUPERVISOR',
      nombre:'SUPERVISOR'
    },
    {
      id:'CLIENTE',
      nombre:'CLIENTE'
    }
  ];
  sucursales:SucursalModel[] = [];
  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private sucursalService: SucursalService,
    private modalService: NzModalService
    ) {}
    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        sucursalId: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        apellidos: ['',[Validators.required]],
        matricula: ['',[Validators.required]],
        correoElectronico: ['',[Validators.required]],
        rol: ['',[Validators.required]],
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
      this.usuarioService.getAll()
      .subscribe({
        next:(response)=>{
          console.log('departamentos', response);
          this.data = response;
          this.filteredData = response;
          
          this.isLoading = false;
          this.showContent = true;
        }
      })
    }
  
    private applyFilters(): any[] {
      
      return this.data.filter((data2) =>
        data2.matricula.toString().toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.nombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.apellidos.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.roles.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.sucursalName.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
      );
    }
  
    //metodos para la forma
    filterItems(): void {
      this.filteredData = this.applyFilters();
    }
  
    showNew(newItem: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: 'Información del usario',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Agregar usuario',
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
      
      this.validateForm.setValue({

        sucursalId: model.sucursalId,
        nombre: model.nombre,
        apellidos: model.apellidos,
        matricula: model.matricula,
        correoElectronico: model.correoElectronico,
        rol: model.rolId,
      })
  
      const modal = this.modalService.create({
          nzTitle: 'Información del usuario',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Actualizar usuario',
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
        
        
        var request:UsuarioModel = {
          id : '',
          matricula: this.validateForm.value.matricula,
          nombre : this.validateForm.value.nombre,
          apellidos : this.validateForm.value.apellidos,
          sucursalId : this.validateForm.value.sucursalId,
          correoElectronico: this.validateForm.value.correoElectronico,
          activo : true,
          rolId: this.validateForm.value.rol,
        };
        
        console.log(request, id);
        this.usuarioService.update(id, request)
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
        
  
        
        var request:UsuarioModel = {
          id : '',
          matricula: this.validateForm.value.matricula,
          nombre : this.validateForm.value.nombre,
          apellidos : this.validateForm.value.apellidos,
          sucursalId : this.validateForm.value.sucursalId,
          correoElectronico: this.validateForm.value.correoElectronico,
          activo : true,
          rolId: this.validateForm.value.rol,
        };
        
        console.log(request);

        this.usuarioService.create(request)
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
  
