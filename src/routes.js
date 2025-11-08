import Home from '@/pages/Home/Home';
import Temperature from '@/pages/Temperature/Temperature';
import CO2 from '@/pages/CO2/CO2';
import Methane from '@/pages/Methane/Methane';
import NO2 from '@/pages/NO2/NO2';
import Artic from '@/pages/Artic/Artic';

export const AppRoutes = [
  {
    path: '/',
    element: Home,
    name: 'Home',
    key: 'home',
  },
  {
    path: '/temperature',
    element: Temperature,
    name: 'Temperatura',
    key: 'temperature',
  },
  {
    path: '/co2',
    element: CO2,
    name: 'CO2',
    key: 'co2',
  },
  {
    path: '/methane',
    element: Methane,
    name: 'Metano',
    key: 'methane',
  },
  {
    path: '/no2',
    element: NO2,
    name: 'Ossido di Azoto',
    key: 'no2',
  },
  {
    path: '/artic',
    element: Artic,
    name: 'Ghiaccio Artico',
    key: 'artic',
  },
];
