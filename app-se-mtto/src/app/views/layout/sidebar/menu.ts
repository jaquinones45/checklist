import { MenuItem } from './menu.model';
const plantas = localStorage.getItem('plants').split(',');

const menuini: any = [
  {
    label: 'Principal',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'SA',
    isTitle: true
  }
];
let area = localStorage.getItem('area');
plantas.forEach((x) => {
  menuini.push({
    label: x.replace('_', ' '),
    icon: 'database',
    subItems: [
      {
        label: 'Alarmas',
        link: '/' + area + '/' + x + '/alarmnow'
      },
      {
        label: 'Alarmas - Historia',
        link: '/' + area + '/' + x + '/alarmhisto'
      },

      {
        label: 'Alarmas - inhibidas',
        link: '/' + area + '/' + x + '/alarminh'
      },
      {
        label: 'Señales en manual',
        link: '/' + area + '/' + x + '/senales'
      },
      {
        label: 'Lazos',
        link: '/' + area + '/' + x + '/lazos'
      },
      {
        label: 'Acciones del operador',
        link: '/' + area + '/' + x + '/acciones'
      },
      {
        label: 'Controladores',
        link: '/' + area + '/' + x + '/controladores'
      },
      {
        label: 'Módulos IO',
        link: '/' + area + '/' + x + '/modulos'
      },
      {
        label: 'Switches',
        link: '/' + area + '/' + x + '/switches'
      },
      {
        label: 'Mensajes',
        link: '/' + area + '/' + x + '/mensajes'
      }
    ]
  });
});
const check = ['DCS'];
menuini.push({
  label: 'WEB CHECK LIST',
  isTitle: true
});
area = 'cmpc';
check.forEach((x) => {
  menuini.push({
    label: x.replace('_', ' '),
    icon: 'database',
    subItems: [
      {
        label: 'Dashboard',
        link: '/check/' + area + '/' + x + '/none' + '/dashboard'
      },
      {
        label: 'Histórico',
        link: '/check/' + area + '/' + x + '/historia'
      },

      {
        label: 'Edición',
        link: '/check/' + area + '/' + x + '/edicion'
      }
    ]
  });
});

export const MENU: MenuItem[] = menuini;
