import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { PrioridadModel } from 'src/app/models/prioridad/prioridad-model';
import { EquipoService } from 'src/app/services/equipo.service';
import { EquipoModel } from 'src/app/models/equipo/equipo-model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AsignarUsuario } from 'src/app/models/equipo/asigna-usuario-model';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];
  usuarios:any[]=[];

  sucursales: SucursalModel[] = [];
  validateForm!: UntypedFormGroup;
  validateFormAgente!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private sucursalService: SucursalService,
    private usuarioService: UsuarioService,
    private modalService: NzModalService
  ) { }
  ngOnInit() {

    // Simulate loading time
    this.validateForm = this.fb.group({
      sucursalId: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    this.validateFormAgente = this.fb.group({
      usuario: ['', [Validators.required]]
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
        next: (response) => {
          this.sucursales = response;
        }
      })
    this.equipoService.getAll()
      .subscribe({
        next: (response) => {
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
      data2.sucursalNombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.nombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.descripcion.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.categorias.join(' ').toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.usuarios.join(' ').toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.supervisores.join(' ').toLowerCase().includes(this.contactSearchValue.toLowerCase())
    );
  }

  //metodos para la forma
  filterItems(): void {
    this.filteredData = this.applyFilters();
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
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

  showAddUserAgente(newItem: TemplateRef<{}>, model: any) {
    this.validateFormAgente.reset();
    //console.log(model.sucursalId);
    //buscamos los agente
    this.usuarioService.GetAgentes(model.sucursalId)
    .subscribe({
      next: (response) => {
        this.usuarios = response;
        const modal = this.modalService.create({
          nzTitle: 'Agregar agente',
          nzContent: newItem,
          nzFooter: [
            {
              label: 'Agregar',
              type: 'primary',
              onClick: () => {
                this.submitAsignarUsuarioForm(model.id, 'Agente');
              }
            },
          ],
          nzWidth: 620
        })
      }
    })
    
  }
  showAddUserSupervisor(newItem: TemplateRef<{}>, model: any) {
    this.validateFormAgente.reset();

    this.usuarioService.GetSupervisores(model.sucursalId)
    .subscribe({
      next: (response) => {
        this.usuarios = response;
        const modal = this.modalService.create({
          nzTitle: 'Agregar agente',
          nzContent: newItem,
          nzFooter: [
            {
              label: 'Agregar',
              type: 'primary',
              onClick: () => {
                this.submitAsignarUsuarioForm(model.id, 'Supervisor');
              }
            },
          ],
          nzWidth: 620
        })
      }
    })
  }

  showEdit(newItem: TemplateRef<{}>, model: any) {

    this.validateForm.setValue({
      sucursalId: model.sucursalId,
      nombre: model.nombre,
      descripcion: model.descripcion
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

  submitAsignarUsuarioForm(equipoId: string, tipo:string): void {
    if (this.validateFormAgente.valid) {
      var request: AsignarUsuario = {
        EquipoId:equipoId,
        UsuarioId:this.validateFormAgente.value.usuario
      };

      if(tipo == 'Agente'){
        this.equipoService.asignarAgente(request)
        .subscribe({
          next: (response) => {
            this.modalService.closeAll();
            this.validateFormAgente.reset();
            this.loadData();
          }
        })
      }
      
      if(tipo == 'Supervisor'){
        this.equipoService.asignarSupervisor(request)
        .subscribe({
          next: (response) => {
            this.modalService.closeAll();
            this.validateFormAgente.reset();
            this.loadData();
          }
        })
      }

    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitUpdForm(id: string): void {
    if (this.validateForm.valid) {
      var request: EquipoModel = {
        sucursalId: this.validateForm.value.sucursalId,
        nombre: this.validateForm.value.nombre,
        descripcion: this.validateForm.value.descripcion,
        categorias: [],
        usuarios: [],
        supervisores: []
      };

      console.log(request, id);
      this.equipoService.update(id, request)
        .subscribe({
          next: (response) => {
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



      var request: EquipoModel = {
        sucursalId: this.validateForm.value.sucursalId,
        nombre: this.validateForm.value.nombre,
        descripcion: this.validateForm.value.descripcion,
        categorias: [],
        usuarios: [],
        supervisores: []
      };

      console.log(request);

      this.equipoService.create(request)
        .subscribe({
          next: (response) => {
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

  
  borrarAgenteConfirm(equipoId:any,usuarioId:any):void{
    this.modalService.confirm({
      nzTitle: '<h2 class="text-dark dark:text-white/[.87]">Deseas eliinar el usuario seleccionado?</h2>',
      nzOnOk: () =>{
        var request: AsignarUsuario = {
          EquipoId:equipoId,
          UsuarioId:usuarioId
        };

        this.equipoService.desAsignarUsuario(request)
        .subscribe({
          next: (response) => {
            this.modalService.closeAll();
            this.loadData();
          }
        })

      }
    });
  }
}

