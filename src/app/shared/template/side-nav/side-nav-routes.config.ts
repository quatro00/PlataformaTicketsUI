import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  
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
    path: 'administrador/proyecto',
    title: 'Proyectos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu:[]
  },
]
