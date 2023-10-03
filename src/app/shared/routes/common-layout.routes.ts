import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [

   
    {
        path: 'administrador',
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminModule),
    },
    {
        path: 'cliente',
        loadChildren: () => import('../../pages/cliente/cliente.module').then(m => m.ClienteModule),
    },
    {
        path: 'supervisor',
        loadChildren: () => import('../../pages/supervisor/supervisor.module').then(m => m.SupervisorModule),
    },
    {
        path: 'agente',
        loadChildren: () => import('../../pages/agente/agente.module').then(m => m.AgenteModule),
    },
    //Component
   
    
];
