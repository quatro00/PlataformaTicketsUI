import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const AdminRoutes: SideNavInterface[] = [
  
  {
    path: 'administrador/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
  },
  {
    path: 'administrador/perfil',
    title: 'Perfil',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
  },
  {
    path: '',
    title: 'Usuarios',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[
      {
        path: 'administrador/usuarios',
        title: 'Usuarios',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'administrador/equipos',
        title: 'Equipos de atención',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
    ]
  },
  {
    path: '',
    title: 'Sucursales',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[
      {
        path: 'administrador/sucursal',
        title: 'Sucursales',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'administrador/departamento',
        title: 'Departamentos',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
    ]
  },
  {
    path: '',
    title: 'Categorias',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[
      {
        path: 'administrador/categoria',
        title: 'Categorias',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'administrador/subcategoria',
        title: 'Sub-Categorias',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
    ]
  },
  {
    path: 'administrador/prioridad',
    title: 'Prioridad',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
  },
  {
    path: 'administrador/proyecto',
    title: 'Proyectos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
  },
]

export const AgenteRoutes: SideNavInterface[] = [
  
  {
    path: 'agente/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
}]

  export const ClienteRoutes: SideNavInterface[] = [
  
    {
      path: 'cliente/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'home',
      submenu:[]
    },
    {
      path: 'cliente/perfil',
      title: 'Perfil',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'user',
      submenu:[]
    },
    {
      path: 'cliente/crearticket',
      title: 'Crear ticket',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'file-add',
      submenu:[]
    },
    {
      path: 'cliente/tickets-activos',
      title: 'Tickets activos',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'tags',
      submenu:[]
    },
    {
      path: 'cliente/tickets-cerrados',
      title: 'Tickets cerrados',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'stop',
      submenu:[]
    },
    {
      path: 'cliente/tickets-pendientes',
      title: 'Tickets pendientes',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'file-exclamation',
      submenu:[]
    }
]

  export const SupervisorRoutes: SideNavInterface[] = [

    {
      path: 'supervisor/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
    {
      path: 'supervisor/perfil',
      title: 'Perfil',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
    {
      path: '',
      title: 'Tickets',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[
        {
          path: 'supervisor/tickets-abiertos',
          title: 'Abiertos',
          iconType: '',
          icon: '',
          iconTheme: '',
          submenu: [],
        },
        {
          path: 'supervisor/tickets-en-atencion',
          title: 'En atención',
          iconType: '',
          icon: '',
          iconTheme: '',
          submenu: [],
        },
        {
          path: 'supervisor/tickets-pendientes',
          title: 'Pendientes',
          iconType: '',
          icon: '',
          iconTheme: '',
          submenu: [],
        },
        {
          path: 'supervisor/tickets-cerrados',
          title: 'Cerrados',
          iconType: '',
          icon: '',
          iconTheme: '',
          submenu: [],
        },
      ]
    }
]
