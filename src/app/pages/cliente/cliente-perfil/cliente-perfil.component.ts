import { Component, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal-model';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { PrioridadModel } from 'src/app/models/prioridad/prioridad-model';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent {
  isLoading = true;
  showContent = false;


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
        nivelDePrioridad: ['1',[Validators.required]],
        color: ['#00FF00',[Validators.required]],
      });
  
      this.loadData();
    }
  
    loadData() {
  
      this.isLoading = false;
      this.showContent = true;
    
    }
  
    
  
   
  }
  
