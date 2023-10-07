import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaModel } from 'src/app/models/categoria/categoria-model';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { CategoriaListModel } from 'src/app/models/categoria/categoria-list-model';
import { SubCategoriaModel } from 'src/app/models/subcategoria/subcategoria-model';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent {
  isLoading = true;
  showContent = false;

  //variables para la tabla
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  data: any[] = [];
  filteredData: any[] = [];

  sucursales:CategoriaListModel[] = [];
  validateForm!: UntypedFormGroup;

  constructor( 
    private fb: FormBuilder,   
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private modalService: NzModalService
    ) {}
    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        categoriaId: ['',[Validators.required]],
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
      this.categoriaService.getAll()
      .subscribe({
        next:(response)=>{
          this.sucursales = response;
        }
      })
      this.subcategoriaService.getAll()
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
          nzTitle: 'Información de la subcategoría',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Agregar subcategoría',
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
          categoriaId : model.categoriaId,
          nombre : model.nombre,
          descripcion : model.descripcion,
      })
  
      const modal = this.modalService.create({
          nzTitle: 'Información de la subcategoría',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Actualizar subcategoría',
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
        
        
        var request:SubCategoriaModel = {
          id : '',
          categoriaId : this.validateForm.value.categoriaId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          activo : true,
        };
        
        console.log(request, id);
        this.subcategoriaService.update(id, request)
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
        
  
        
        var request:SubCategoriaModel = {
          id : '',
          categoriaId : this.validateForm.value.categoriaId,
          nombre : this.validateForm.value.nombre,
          descripcion : this.validateForm.value.descripcion,
          activo : true,
        };
        
        console.log(request);

        this.subcategoriaService.create(request)
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
  
