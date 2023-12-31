import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { AreaComponent } from './area/area.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: CategoriaComponent,
    data: {
        title: 'Categorias',
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Administrador',
    }
  },
  {
    path: 'departamento',
    component: DepartamentoComponent,
    data: {
        title: 'Departamento',
    }
  },
  {
    path: 'departamento/area/:departamentoId',
    component: AreaComponent,
    data: {
        title: 'Departamento',
    }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: {
        title: 'Perfil',
    }
  },
  {
    path: 'proyecto',
    component: ProyectoComponent,
    data: {
        title: 'Proyecto',
    }
  },
  {
    path: 'subcategoria',
    component: SubcategoriaComponent,
    data: {
        title: 'Subcategoria',
    }
  },
  {
    path: 'sucursal',
    component: SucursalComponent,
    data: {
        title: 'Sucursal',
    }
  },
  {
    path: 'prioridad',
    component: PrioridadComponent,
    data: {
        title: 'Prioridad',
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
        title: 'Usuarios',
    }
  },
  {
    path: 'equipos',
    component: EquiposComponent,
    data: {
        title: 'Equipo de atención',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
