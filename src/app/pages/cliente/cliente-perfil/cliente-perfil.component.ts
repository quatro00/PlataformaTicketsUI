import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PerfilModel } from 'src/app/models/usuario/perfil';

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
    private usuarioService: UsuarioService,
    ) {}
    ngOnInit() {
      
      // Simulate loading time
      this.validateForm = this.fb.group({
        matricula: ['',[Validators.required]],
        sucursal: ['',[Validators.required]],
        nombre: ['',[Validators.required]],
        apellidos: ['',[Validators.required]],
        correoElectronico: ['',[Validators.required]],
        telefono: ['',[Validators.required]],
      });
  
      this.loadData();
    }
  
    loadData() {
      this.usuarioService.getPerfil()
      .subscribe({
        next:(response)=>{
          console.log(response);
          this.validateForm.setValue({
            matricula : response.matricula,
            sucursal : response.sucursalNombre,
            apellidos : response.apellidos,
            nombre: response.nombre,
            correoElectronico: response.correoElectronico,
            telefono: response.telefono
        })
          this.isLoading = false;
          this.showContent = true;
        }
      })
    }

    submitForm(){
      if (this.validateForm.valid) {
       
        var request:PerfilModel = {
          matricula : this.validateForm.value.matricula,
          sucursalNombre : this.validateForm.value.sucursal,
          apellidos : this.validateForm.value.apellidos,
          nombre: this.validateForm.value.nombre,
          correoElectronico: this.validateForm.value.correoElectronico,
          telefono: this.validateForm.value.telefono
        };
        
console.log(request);
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
  
    
  
   
  }
  
