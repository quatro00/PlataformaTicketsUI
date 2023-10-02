import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [{
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu: [{
        path: '/dashboard/demo-one',
        title: 'Demo One',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: '/dashboard/demo-two',
        title: 'Demo Two',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: '/dashboard/demo-three',
        title: 'Demo Three',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: '/dashboard/demo-four',
        title: 'Demo Four',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
    ]
    
  },
]
