import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CapturaMaterialRequest } from 'src/app/models/ticket/create-material-request';
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
  data: any[] = [];
  filteredData: any[] = [];

  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder) { }

    ngOnInit() {
      this.filteredData = this.ticket.materiales;
      this.materialForm = this.fb.group({
        concepto: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        unidad: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        precio: ['', [Validators.required]],
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
    submitForm(): void {
      console.log(this.materialForm.valid);
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
