import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaModel } from 'src/app/models/categoria/categoria-model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
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
    private categoriaService: CategoriaService,
    private sucursalService: SucursalService,
    private modalService: NzModalService
    ) {}
    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        sucursalId: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        descripcion: ['',[Validators.required]],
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
      this.categoriaService.getAll()
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
        data2.sucursalClave.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.sucursalNombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
        data2.nombre.toLowerCase().includes(this.contactSearchValue.toLowerCase()) 
      );
    }
  
    //metodos para la forma
    filterItems(): void {
      this.filteredData = this.applyFilters();
    }
  
    showNew(newItem: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: 'Información de la categoría',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Agregar categoría',
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
          sucursalId : model.sucursalId,
          nombre : model.nombre,
          descripcion : model.descripcion,
      })
  
      const modal = this.modalService.create({
          nzTitle: 'Información de la categoría',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Actualizar categoría',
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
        
        
        var request:CategoriaModel = {
          id : '',
          sucursalId : this.validateForm.value.sucursalId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          activo : true,
        };
        
        console.log(request, id);
        this.categoriaService.update(id, request)
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
        
  
        
        var request:CategoriaModel = {
          id : '',
          sucursalId : this.validateForm.value.sucursalId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          activo : true,
        };
        
        console.log(request);

        this.categoriaService.create(request)
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
  
