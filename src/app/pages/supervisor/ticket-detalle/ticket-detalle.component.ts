import jsonData from '../../../../assets/data/pages/help-card.json';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketModel } from 'src/app/models/ticket/ticket-model';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CreateTicketMensajeRequest } from 'src/app/models/ticket/create-ticket-mensaje';
import { TicketComentarioService } from 'src/app/services/ticket-comentario.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { AgenteModel } from 'src/app/models/usuario/agente-model';

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.component.html',
  styleUrls: ['./ticket-detalle.component.css']
})
export class TicketDetalleComponent {
  //assets/data/pages/help-card.json
  @Input() ticket: TicketModel;
  agentes:AgenteModel[]=[];
  //ticket:TicketModel;
  jsonData = jsonData; ticketUsers: any[];
  localStorageKey = 'ticket_users';
  actualizarEstatusForm!: UntypedFormGroup;
  asignarAgentesForm!: UntypedFormGroup;
  mensajeForm!: UntypedFormGroup;


  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;

  constructor(
    private http: HttpClient,
    private ticketService: TicketService,
    private ticketComentarioService: TicketComentarioService,
    private fb: FormBuilder,
    private equipoService:EquipoService) { }

  ngOnInit() {
    console.log(this.ticket);

    this.equipoService.getAgentesBySupervisor(this.ticket.id)
    .subscribe({
      next: (response) => {
        this.agentes = response;
        console.log(this.agentes);
      }
    })

    this.actualizarEstatusForm = this.fb.group({
      estatusId: [null, [Validators.required]],
      Observaciones: ['', [Validators.required]],
    });

    this.asignarAgentesForm = this.fb.group({
      agentes: [null, [Validators.required]]
    });

    this.mensajeForm = this.fb.group({
      mensaje: ['', [Validators.required]]
    });

    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      this.ticketUsers = JSON.parse(storedData);
    } else {
      this.http.get<any>('assets/data/pages/ticket-user.json').subscribe(data => {
        this.ticketUsers = data.ticketUsers;
      });
    }
  }

  loadData() {
    this.ticketService.getSupervisorTicketDetalle(this.ticket.id)
      .subscribe({
        next: (response) => {
          this.ticket = response;
        }
      })
  }

  enviarMensaje() {
    if (this.mensajeForm.valid) {

      console.log(this.mensajeForm.value);
      var request: CreateTicketMensajeRequest = {
        ticketId: this.ticket.id,
        mensaje: this.mensajeForm.value.mensaje
      };

      this.ticketComentarioService.crear(request)
        .subscribe({
          next: (response) => {

            this.mensajeForm.reset();
            this.loadData();
          }
        })
    } else {
      Object.values(this.mensajeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Handle error, if any.
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.ticketUsers));
  }

  sendMessage(message: string) {
    if (message.trim() === '') {
      return; // Don't add empty messages
    }

    const newMessage = {
      avatar: 'assets/images/avatars/thumbs.png', // Replace with the URL of the user's avatar
      name: 'Md. Rafiq', // Replace with the sender's name
      messagePreview: message,
      timestamp: new Date().toLocaleString(),
      isUnread: true, // Assuming new messages are always unread
    };

    this.ticketUsers.push(newMessage);
    this.saveDataToLocalStorage();
    // Optionally, you can clear the input field after sending the message
    // newMessageInput.value = '';
  }
}