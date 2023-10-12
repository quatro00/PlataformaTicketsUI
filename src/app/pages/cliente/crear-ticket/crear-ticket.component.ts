import { Component, TemplateRef, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PerfilModel } from 'src/app/models/usuario/perfil';
import { DOCUMENT } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaListModel } from '../../../models/categoria/categoria-list-model';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { SubCategoriaListModel } from 'src/app/models/subcategoria/subcategoria-list-model';
import { PrioridadListModel } from 'src/app/models/prioridad/prioridad-list-model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamento/departamento-model';
import { AreaService } from 'src/app/services/area.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.css'],
  styles: [
    `
    :host ::ng-deep .ant-upload.ant-upload-drag p.ant-upload-text{
      @apply text-theme-gray dark:text-white/60;
    }

      :host ::ng-deep .ant-select:not(.ant-select-customize-input) .ant-select-selector{
        @apply h-[44px] px-[20px] border-normal dark:bg-white/10 dark:border-white/10 rounded-4 capitalize;
      }
      :host ::ng-deep .ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input{
        @apply h-[44px] px-[20px];
      }
      :host ::ng-deep .ant-select-single .ant-select-selector .ant-select-selection-placeholder{
        @apply flex items-center;
      }
      :host ::ng-deep .ant-select-dropdown .ant-cascader-menu{
        @apply dark:border-white/10;
      }
      :host ::bg-deep .ant-select-dropdown .ant-cascader-menu-item{
        @apply dark:text-white/[.87];
      }
    `
  ]
})
export class CrearTicketComponent {
  isLoading = true;
  showContent = false;


  validateForm!: UntypedFormGroup;
  categorias:CategoriaListModel[]=[];
  subCategorias:SubCategoriaListModel[]=[];
  prioridades:PrioridadListModel[]=[];
  departamentos:DepartamentoModel[]=[];
  nzOptions:any[]=[];;

  selected:string;
  subcategoria:any;
  constructor( 
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private prioridadService: PrioridadService,
    private categoriaService:CategoriaService,
    private subCategoriaService:SubcategoriaService,
    private departamentoService:DepartamentoService,
    private areaService:AreaService,
    @Inject(DOCUMENT) private document: Document
    ) {}
    ngOnInit() {
      

      this.validateForm = this.fb.group({
        titulo: ['',[Validators.required]],
        categoria: ['',[Validators.required]],
        subcategoria: ['',[Validators.required]],
        departamento: ['',[Validators.required]],
        area: ['',[Validators.required]],
        prioridad: ['',[Validators.required]],
        descripcion: ['',[Validators.required]]
      });

      this.loadData();
    }
  
    SelectCategoria(categoriaId){
      this.validateForm.patchValue({
        subcategoria: null,
      });
      this.subCategoriaService.getSubCategorias(categoriaId)
      .subscribe({
        next:(response)=>{
          this.subCategorias = response;
        }
      })
    }

    loadData() {
      
      this.departamentoService.getDepartamentos()
      .subscribe({
        next:(response)=>{
          console.log(response);
          this.departamentos = response;
        }
      })

      this.categoriaService.getCategorias()
      .subscribe({
        next:(response)=>{
          this.categorias = response;
          this.isLoading = false;
          this.showContent = true;
        }
      })

      this.prioridadService.getPrioridades()
      .subscribe({
        next:(response)=>{
          this.prioridades = response;
        }
      })
    }

    SelectDepartamento(departamentoId:string){
      this.validateForm.patchValue({
        area: null,
      });
      this.areaService.GetAreas(departamentoId).subscribe({
        next:(response)=>{
          console.log(response);
          this.nzOptions = response;
        }
      })
    }
    isDarkMode(): boolean {
      return this.document.body.classList.contains('dark');
    }
   
    submitForm(){
      if (this.validateForm.valid) {
       
console.log(this.validateForm.value);
        /*
        this.prioridadService.update(id, request)
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

    onChanges(values: any): void {
      console.log(values);
    }

    handleChange({ file, fileList }: NzUploadChangeParam): void {
      const status = file.status;

      //console.log(file, fileList);

      if (status !== 'uploading') {
        console.log(file, fileList);
      }
      if (status === 'done') {
        this.msg.success(`${file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.msg.error(`${file.name} file upload failed.`);
      }
    }
  }
  
