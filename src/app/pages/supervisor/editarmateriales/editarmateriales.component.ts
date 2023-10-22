import { Component, ElementRef, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActualizarEstatusModel } from 'src/app/models/ticket/actualizar-estatus-model';
import { CapturaMaterialRequest } from 'src/app/models/ticket/create-material-request';
import { BorrarMaterialRequest } from 'src/app/models/ticket/delete-material-request';
import { TicketModel } from 'src/app/models/ticket/ticket-model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-editarmateriales',
  templateUrl: './editarmateriales.component.html',
  styleUrls: ['./editarmateriales.component.css']
})
export class EditarmaterialesComponent {
  @Input() ticket: TicketModel;

  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;

  materialForm!: UntypedFormGroup;
  validateForm!: UntypedFormGroup;
  data: any[] = [];
  filteredData: any[] = [];

  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder,
    private modalService: NzModalService) { }

    ngOnInit() {
      this.filteredData = this.ticket.materiales;
      this.materialForm = this.fb.group({
        concepto: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        unidad: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        precio: ['', [Validators.required]],
      });

      this.validateForm = this.fb.group({
        observaciones: ['', [Validators.required]]
      });
  
    }

    loadData():void{
      this.ticketService.getSupervisorTicketDetalle(this.ticket.id)
      .subscribe({
        next: (response) => {
          this.ticket = response;
          this.filteredData = this.ticket.materiales;
          console.log(this.ticket);
        }
      })
    }

    borrarMaterial(materialId:string):void{
      this.modalService.confirm({
        nzTitle: '<h2 class="text-dark dark:text-white/[.87]">Deseas eliminar el material seleccionado?</h2>',
        nzOnOk: () =>{
         
          var request: BorrarMaterialRequest = {
            ticketId:this.ticket.id,
            materialId:materialId
          };
  
          this.ticketService.borrarMaterial(request)
          .subscribe({
            next: (response) => {
              //this.modalService.cl();
              this.loadData();
            }
          })
          
        }
      });
    }

    showNew(newItem: TemplateRef<{}>) {
      this.validateForm.reset();
      const modal = this.modalService.create({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]">Deseas cerrar el ticket '+this.ticket.folio.toString()+'?</h2>',
          nzContent: newItem,
          nzFooter: [
              {
                  label: 'Cerrar ticket',
                  type: 'primary',
                  onClick: () => {
                    this.cerrarTicket();
                  }
              },
          ],
          nzWidth: 620
      })
    }

    cerrarTicket():void{
      if (this.validateForm.valid) {
        console.log(this.validateForm);
  
        var request:ActualizarEstatusModel = {
          ticketId: this.ticket.id,
          observaciones : this.validateForm.value.observaciones,
        };
         
        console.log(request);

        this.ticketService.cerrarTicket(request)
        .subscribe({
          next:(response)=>{
            this.validateForm.reset();
            this.modalService.closeAll();
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
     
      if (this.materialForm.valid) {
        var request:CapturaMaterialRequest = {
          ticketId: this.ticket.id,
          concepto : this.materialForm.value.concepto,
          tipo : this.materialForm.value.tipo,
          unidad : this.materialForm.value.unidad,
          cantidad : this.materialForm.value.cantidad,
          precio : this.materialForm.value.precio
        };
         
        console.log(request);

        this.ticketService.capturaMaterial(request)
        .subscribe({
          next:(response)=>{
            this.materialForm.reset();
            this.loadData();
          }
        })
      } else {
        Object.values(this.materialForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }


}
