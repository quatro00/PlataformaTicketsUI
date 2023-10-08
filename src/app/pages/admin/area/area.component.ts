import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AreaBaseModel } from 'src/app/models/area/area-base-model';
import { AreaService } from 'src/app/services/area.service';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  styles: [`
  :host ::ng-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    @apply text-15 font-normal text-dark/[.85] dark:text-white/[.87];
  }
  :host ::ng-deep .ant-collapse-borderless > .ant-collapse-item:last-child{
    @apply border-b-1 border-regular dark:border-white/10 border-solid;
  }
  :host ::ng-deep .ant-collapse-content > .ant-collapse-content-box{
    @apply px-6 pt-5 pb-[30px] #{!important};
  }
  :host ::ng-deep .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow{
    @apply text-[9px] text-light dark:text-white/60;
  }
`]
})
export class AreaComponent {
  collapsePanelClass: string = 'mb-1 font-medium text-dark bg-transparent dark:text-white/[.87] text-15 border-regular border-1 dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none [&>.ant-collapse-header]:px-[20px] [&>.ant-collapse-header]:py-[12px] aria-expanded:[&>.ant-collapse-header]:border-b-1 [&>.ant-collapse-header]:border-regular dark:[&>.ant-collapse-header]:border-white/10';
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
  isLoading = true;
  showContent = false;
  departamentoId: string;
  areasBase: AreaBaseModel[] = [];
  areasHijas: AreaBaseModel[] = [];
  validateForm!: UntypedFormGroup;


  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private areaService: AreaService,
    private modalService: NzModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.departamentoId = this.route.snapshot.paramMap.get('departamentoId');

    // Simulate loading time
    this.validateForm = this.fb.group({
      clave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    this.areaService.GetAreasBaseByDepartamento(this.departamentoId)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showContent = true;
          this.areasBase = response;
          this.areasHijas = response;
          console.log(this.areasBase);
        }
      })
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
    const modal = this.modalService.create({
      nzTitle: 'Información del area',
      nzContent: newItem,
      nzFooter: [
        {
          label: 'Agregar área',
          type: 'primary',
          onClick: () => {
            this.submitForm();
          }
        },
      ],
      nzWidth: 620
    })
  }

  showNewArea(newItem: TemplateRef<{}>, areaId:string){
    console.log(areaId);
    this.validateForm.reset();
    const modal = this.modalService.create({
      nzTitle: 'Información del area',
      nzContent: newItem,
      nzFooter: [
        {
          label: 'Agregar área',
          type: 'primary',
          onClick: () => {
            this.submitAreaForm(areaId);
          }
        },
      ],
      nzWidth: 620
    })
  }

  submitAreaForm(areaId:string): void {
    console.log(this.departamentoId);
    if (this.validateForm.valid) {
      console.log(this.validateForm);


      var request: AreaBaseModel = {
        id: '',
        departamentoId: this.departamentoId,
        clave: this.validateForm.value.clave,
        descripcion: this.validateForm.value.descripcion,
        nombre: this.validateForm.value.nombre,
        areaPadreId:areaId,
        activo: true,
      };

      console.log(request);
      this.areaService.createAreaBase(request)
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
    console.log(this.departamentoId);
    if (this.validateForm.valid) {
      console.log(this.validateForm);


      var request: AreaBaseModel = {
        id: '',
        departamentoId: this.departamentoId,
        clave: this.validateForm.value.clave,
        descripcion: this.validateForm.value.descripcion,
        nombre: this.validateForm.value.nombre,
        areaPadreId:null,
        activo: true,
      };


      this.areaService.createAreaBase(request)
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

}
